var dateTime = require('node-datetime');
var crypto = require('crypto-js');

const DIFFICULTY = 2;
const MINE_RATE = 1000 // 3 sec - dynamic mine rate

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    //hash the current data
    static createHash(data, timestamp, lastHash, nonce, difficulty){
        return crypto.SHA256(`${data}${timestamp}${lastHash}${nonce}${difficulty}`).toString();
    }

    //genesis - 1st block
    static genesis() {
        var currentTime = new Date();
        return new this(currentTime, "NA", this.createHash([],currentTime,"NA"), [], 0, DIFFICULTY);
    }

    // returns hash for a given block.
    static getHash(block){
        const {timestamp, lastHash, data, nonce} = block;
        return this.createHash(data, timestamp, lastHash, nonce, difficulty);
    }

    // create a new block given the last block.
    static mineBlock(lastBlock, data) {
        let hash;
        let timestamp;
        let { difficulty } = lastBlock;
        const lastHash = lastBlock.hash;
        // const hash = this.createHash(data, timestamp, lastHash);
        let nonce = 0;
        do {
            nonce++;
            timestamp = new Date();
            difficulty = this.adjustDifficulty( lastBlock, timestamp);
            hash = this.createHash(data, timestamp, lastHash, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    toString(){
        return `Block:-
           TimeStamp: ${this.timestamp},
           Last Hash: ${this.lastHash.substring(0, 16)},
           hash: ${this.hash.substring(0, 16)},
           nonce: ${this.nonce},
           difficulty: ${this.difficulty},
           data: ${this.data}`;
    }
    
    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;
