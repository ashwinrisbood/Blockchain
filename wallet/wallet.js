
const ChainUtil = require('../chain-util');
const INITIAL_BALANCE = 500;

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.keyGen();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    
    toString(){
        return `Wallet:-
           publicKey: ${this.publicKey.toString()}
           balance  : ${this.balance}`
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
}

module.exports = Wallet;