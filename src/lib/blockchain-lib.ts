import { BlockType } from "./types"


export class Block implements BlockType {
    blockIndex: number;
    blockTimestamp: string;
    blockHash: Promise<string>;
    prevBlockHash: Promise<string>;
    blockHashString: string | undefined;
    prevBlockHashString: string | undefined;
    blockData: string;

    constructor(lastBlock: Block, blockData: string) {
        if (!lastBlock) {
            // add genesis block
            this.blockData = blockData;
            this.blockIndex = 0
            this.blockTimestamp = new Date().getTime().toString()
            this.blockHash = createHash(this.blockIndex + this.blockTimestamp + "" + this.blockData)
            this.prevBlockHash = createHash("");

        }
        else {
            this.blockData = blockData;
            this.blockIndex = lastBlock.blockIndex + 1
            this.blockTimestamp = new Date().getTime().toString()
            this.blockHash = createBlockHash(lastBlock)
            this.prevBlockHash = lastBlock.blockHash
        }
    }
}

/**
* Generates a new hash from given block data
* @param blockData 
*/
async function createBlockHash(blockData: Block): Promise<string> {
    return createHash(blockData.blockIndex + blockData.blockTimestamp + blockData.prevBlockHash)
}

async function createHash(data: string): Promise<string> {
    const utf8 = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
    return hashHex
}

/**
* Creates and returns a new block
*/
export function createBlock(lastBlock: Block, data: string): Block {
    const block = new Block(lastBlock, data)
    return block
}

export function isValidBlock(newBlock: Block, oldBlock: Block): boolean {
    return true
}