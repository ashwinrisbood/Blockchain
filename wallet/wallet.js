
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');
const TransactionPool = require('./transaction-pool')
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

    createTransaction(recipient, amount, tp) {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds current balance: {this.balance}`)
            return;
        }

        let transaction = tp.existingTransaction(this.publicKey);

        if(transaction) {
            transaction.update(this, recipient, amount);
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount);
            tp.updateTransaction(transaction);
        }

        return transaction;
    }
}

module.exports = Wallet;