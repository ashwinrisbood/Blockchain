var dateTime = require('node-datetime');
var crypto = require('crypto-js');

class Block{
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static createHash(data, timestamp, lastHash){
        return crypto.SHA256(`${data}${timestamp}${lastHash}`).toString();
    }

    static genesis() {
        var currentTime = dateTime.create().format('m/d/Y H:M:S');
        return new this(currentTime, "NA", this.createHash([],currentTime,"NA"), []);
    }

    static getHash(block){
        const {timestamp, lastHash, data} = block;
        return this.createHash(data, timestamp, lastHash);
    }

    static mineBlock(lastBlock, data) {
        const timestamp = dateTime.create().format('m/d/Y H:M:S');
        const lastHash = lastBlock.hash;
        const hash = this.createHash(data, timestamp, lastHash);

        return new this(timestamp, lastHash, hash, data);
    }

    toString(){
        return `Block:-
           TimeStamp: ${this.timestamp},
           Last Hash: ${this.lastHash.substring(0, 16)},
           hash: ${this.hash.substring(0, 16)},
           data: ${this.data}`;
    }

    
}

module.exports = Block;
