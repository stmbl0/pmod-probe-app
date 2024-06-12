import { get, writable, type Unsubscriber, type Writable } from "svelte/store";
import type { Selector } from "../types";
import { probeTargetInputData, probeTargetOutputData } from "../globals";


export class BitFetcher {

    public bits: Writable<boolean[]> = writable<boolean[]>([]);

    private _unsubscribe?: Unsubscriber;

    constructor(
        public selector: Selector
    ) {
        this.fetchBits();
        this.setupListeners();
    }


    public get bitsArray() {
        return get(this.bits);
    }


    public setupListeners() {
        /// Remove any existing listeners ///
        if(this._unsubscribe) this._unsubscribe();

        /// Subscribe to the data store depending on the selector direction ///
        if(this.selector.dir == "TIPO") {
            this._unsubscribe = probeTargetInputData.subscribe(() => {
                this.fetchBits();
            });
        } else {
            this._unsubscribe = probeTargetOutputData.subscribe(() => {
                this.fetchBits();
            });
        }
    }

    public removeListeners() {
        if(this._unsubscribe) this._unsubscribe();
    }

    public fetchBits() {
        const startIndex = this.getSelectorStartIndex();
        const endIndex = this.getSelectorEndIndex();

        const allData =
            this.selector.dir == "TIPO" ?
                get(probeTargetInputData) :
                get(probeTargetOutputData);

        const result = allData.slice(startIndex, endIndex);
        this.bits.set(result);
    }

    public getSelectorStartIndex() {
        return this.selector.start;
    }
    public getSelectorEndIndex() {
        const endIndex = 
            (typeof this.selector.end !== "undefined") ?
                this.selector.end :
            (typeof this.selector.count !== "undefined") ?
                this.selector.start + this.selector.count :
                this.selector.start+1;
        
        return endIndex;
    }

}


export class BitWriter extends BitFetcher {

    constructor(selector: Selector) {
        super(selector);
    }

    public writeChanges() {
        const startIndex = this.getSelectorStartIndex();
        const endIndex = this.getSelectorEndIndex();
        
        let editedData = get(probeTargetInputData);

        for(var i=startIndex; i<(endIndex||startIndex); i++) {
            editedData[i] = get(this.bits)[i-startIndex];
        }

        probeTargetInputData.set(editedData.map(b=>b));
    }

}