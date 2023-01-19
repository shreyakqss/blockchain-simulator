export interface BlockType {
    blockIndex: number;
    blockTimestamp: string;
    blockHash: Promise<string>;
    prevBlockHash: Promise<string>;
    blockHashString: string | undefined;
    prevBlockHashString: string | undefined;
    blockData: string;
}