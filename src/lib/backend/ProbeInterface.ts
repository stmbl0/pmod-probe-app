import { get } from "svelte/store";
import { USB_PRODUCT_ID, USB_VENDOR_ID } from "./const";
import { probeDetectedProjectID, probeState, probeTargetInputBlockCount, probeTargetInputData, probeTargetOutputBlockCount, probeTargetOutputData } from "./globals";
import { ProbeState, type BulkBitEdit } from "./types";
import { split16BitTo8BitArray } from "./utils";

const DEBUG = true;
const DEBUG_PACKETS = false;
function DEBUG_LOG(...data: any[]) {
    if(!DEBUG) return;
    console.log("[debug]", ...data);
}

// Some reference: https://github.com/UnJavaScripter/web-serial-example/blob/master/src/serial-handler.ts
export class ProbeInterface {

    public writer?: WritableStreamDefaultWriter;

    private port?: SerialPort;
    private _isConnected = false;
    private stream?: WritableStream;

    private buffer: number[] = [];
    private isInPacket = false;

    public targetOutputData: boolean[] = [];
    public targetInputData: boolean[] = [];

    constructor() {
        (window as any)["probe_interface"] = this;

        probeTargetInputData.subscribe(() => {
            this.onTargetInputChanged();
        });
    }

    public async connect() {
        if(this._isConnected) return;

        const port = await this.requestPort();
        if(!port) {
            console.log("no port selected!");
        }

        this.port = port;
        this.port.addEventListener("connect", () => {this.onConnect();} );
        this.port.addEventListener("disconnect", () => {this.onDisconnect();} );

        probeState.set(ProbeState.Connecting);

        this._openPortRetry();
    }

    private async _openPortRetry() {
        if(!this.port) return;

        try {
            await this.port.open({
                baudRate: 921600
            });
    
            this.writer = this.port.writable.getWriter();
            //this.reader = this.port.readable.getReader();

            this.onConnect();
        } catch(err) {
            setTimeout(() => {this._openPortRetry()}, Math.floor(Math.random()*40));
            console.log(err);
        }
    }

    public async disconnect() {
        if(!this._isConnected) return;
        if(!this.port) return;

        this.stream?.getWriter().releaseLock();
        this.port.close();

        this.onDisconnect();
    }

    public async requestPort() {
        return navigator.serial.requestPort({
            filters: [{
                usbVendorId: USB_VENDOR_ID,
                usbProductId: USB_PRODUCT_ID
            }]
        });
    }


    private async onConnect() {
        if(!this.port) return;
        console.log("connected!");

        let _this = this;
        this.stream = new WritableStream(
            {
              start(controller) {},
              write(chunk, controller) {_this.onData(chunk);},
              close() {},
              abort(reason) {},
            }
        );

        this.port.readable.pipeTo(this.stream);

        this._isConnected = true;
        probeState.set(ProbeState.Ready);

        this.startCommunication();
    }

    private async onDisconnect() {
        console.log("disconnected!");

        this._isConnected = false;
        probeState.set(ProbeState.Disconnected);
    }

    private onData(data: Uint8Array) {
        for(var i=0; i<data.length; i++) {
            if(!this.isInPacket && data[i] == 0xF1) {
                this.isInPacket = true;
                this.buffer = [];
            }

            this.buffer.push(data[i]);
            if(this.buffer.length > 15) {
                this.buffer = [];
                this.isInPacket = false;
            }

            if(this.buffer.length >= (this.buffer[2] || 255)+4) {
                if(DEBUG_PACKETS) DEBUG_LOG("rx <<", this.buffer);
                this.handlePacket(this.buffer);

                this.buffer = [];
                this.isInPacket = false;
            }
        }
    }

    private sendPacket( packetType: number, data: number[], sendPadding=false ) {
        if(!this.writer) return;
        if(!this.port) return;
        if(!this._isConnected) return;

        const packetLength = 1 + 1 + 1 + data.length + 1;
        let packet = new Uint8Array(packetLength);

        packet[0] = 0xF1;
        packet[1] = packetType;
        packet[2] = data.length;
        for(var i=0; i<data.length; i++) {
            packet[3+i] = data[i];
        }
        packet[packetLength-1] = 0;

        if(DEBUG_PACKETS) DEBUG_LOG("tx >>", packet);
        this.writer?.write(packet);

        if(sendPadding) {
            let padding = new Uint8Array(4);
            this.writer?.write(padding);
        }
    }

    public handlePacket( data: number[] ) {
        switch(data[1]) {
            case 0x02:
                // Update Probe State //
                const newState = data[3];
                if(newState == 0x00) {
                    DEBUG_LOG("new probe state: 0x00 (DISCONNECTED)");
                    probeState.set(ProbeState.Ready);
                } else if(newState == 0x01) {
                    DEBUG_LOG("new probe state: 0x01 (SEARCHING)");
                    probeState.set(ProbeState.Searching);
                } else if(newState == 0x02) {
                    DEBUG_LOG("new probe state: 0x02 (HANDSHAKE)");
                    probeState.set(ProbeState.Handshake);
                } else if(newState == 0x03) {
                    DEBUG_LOG("new probe state: 0x03 (CONNECTED)");
                    probeState.set(ProbeState.Active);
                }
                break;

            case 0x03:
                // Detected Project ID //
                const projectID = data[3]*256*256 + data[4]*256 + data[5];
                probeDetectedProjectID.set(projectID);
                DEBUG_LOG("detected project id:", `${projectID} (0x${projectID.toString(16)})`);
                break;

            case 0x04:
                // IO Block Configuration //
                const inputBlockCount = data[3]*256 + data[4];
                const outputBlockCount = data[5]*256 + data[6];

                probeTargetInputBlockCount.set(inputBlockCount);
                probeTargetOutputBlockCount.set(outputBlockCount);

                this.targetInputData = new Array(inputBlockCount*3).fill(false);
                this.targetOutputData = new Array(inputBlockCount*3).fill(false);

                probeTargetInputData.set(this.targetInputData.map(b=>b));
                probeTargetOutputData.set(this.targetOutputData.map(b=>b));

                DEBUG_LOG(`target block counts >> input:  ${inputBlockCount} blocks (=${inputBlockCount*3}bits)`);
                DEBUG_LOG(`target block counts >> output: ${outputBlockCount} blocks (=${outputBlockCount*3}bits)`);

                break;

            case 0x05:
                // Target Output Block Data //
                const updateBlockID = data[3]*256 + data[4];
                const updatedData = data[5].toString(2).padStart(3, "0");
                const updatedDataBool = updatedData.split("").map(b => b=="1");

                this.targetOutputData[updateBlockID*3+2] = updatedDataBool[0];
                this.targetOutputData[updateBlockID*3+1] = updatedDataBool[1];
                this.targetOutputData[updateBlockID*3  ] = updatedDataBool[2];

                probeTargetOutputData.set(this.targetOutputData);

                //DEBUG_LOG(`target output block data >> block ${updateBlockID} data ${updatedData}`);
                break;
            
            case 0x06:
                // Transmit cycle finished //
                probeTargetInputData.set(this.targetInputData.map(b=>b));
                probeTargetOutputData.set(this.targetOutputData.map(b=>b));

                break;
        }
    }


    public startCommunication() {
        this.sendPacket(0x80, [], true);
    }

    public startProbe() {
        if(get(probeState) != ProbeState.Ready) return;

        this.sendPacket(0x81, [], true);
    }

    public stopProbe() {
        if(get(probeState) != ProbeState.Active) return;

        this.sendPacket(0x82, [], true);
    }

    public writeTargetInputBlock(blockID: number, data: boolean[]) {
        if(data.length != 3) return;

        this.targetInputData[blockID*3]   = data[0];
        this.targetInputData[blockID*3+1] = data[1];
        this.targetInputData[blockID*3+2] = data[2];
        probeTargetInputData.set(this.targetInputData.map(b=>b));

        this.sendPacket(0x83, [...split16BitTo8BitArray(blockID), (data[0]?1:0)*4 + (data[1]?1:0)*2 + (data[2]?1:0)*1]);
    }

    public writeBulkTargetInput( edits: BulkBitEdit ) {
        let groupedByBlock: Array<{block: number, edits: BulkBitEdit}> = [];

        for(var e of edits) {
            let eBlock = Math.floor(e.bitIndex / 3);

            let blockExisted = false;
            for(var g of groupedByBlock) {
                if(g.block == eBlock) {
                    g.edits.push(e);
                    blockExisted = true;
                    break;
                }
            }

            if(!blockExisted) {
                groupedByBlock.push({
                    block: eBlock,
                    edits: [e]
                });
            }
        }

        // Apply edits //
        for(var be of groupedByBlock) {
            let blockData = this.targetInputData.slice(be.block*3, be.block*3+3);

            for(var ed of be.edits) {
                blockData[ed.bitIndex-(be.block*3)] = ed.newState;
            }

            this.writeTargetInputBlock(be.block, blockData);
        }
    }

    public onTargetInputChanged() {
        const newData = get(probeTargetInputData);
        const oldData = this.targetInputData;

        if(newData != oldData) {
            let edits: BulkBitEdit = [];

            for(var i=0; i<newData.length; i++) {
                if(newData[i] != oldData[i]) {
                    edits.push({
                        bitIndex: i,
                        newState: newData[i]
                    });
                }
            }

            this.writeBulkTargetInput(edits);
        }
    }

}