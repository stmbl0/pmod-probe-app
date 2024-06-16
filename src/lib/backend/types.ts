export enum ProbeState {
    Disconnected,
    Connecting,
    Ready,
    Searching,
    Handshake,
    Active
};

export type BitEdit = {
    bitIndex: number;
    newState: boolean;
};

export type BulkBitEdit = Array<BitEdit>;


export type Selector = {
    dir?: "TOPI" | "TIPO";

    start: number;
    end?: number;
    count?: number;
}

export type BitMapping = Selector & {
    valueMap?: {[key: string]: string};
}