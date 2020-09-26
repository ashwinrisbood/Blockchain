const EC = require('elliptic').ec;
const { v1: uuidV1 } = require('uuid')
const ec = new EC('secp256k1');
var crypto = require('crypto-js');
const { SHA256 } = require('crypto-js');

class ChainUtil{
    static keyGen() {
        return ec.genKeyPair();
    }

    static id() {
        return uuidV1();
    }
    
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}

module.exports = ChainUtil;