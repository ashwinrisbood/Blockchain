const { mode } = require("crypto-js");

class TransactionPool {

    constructor() {
        this.transactions = [];
    }

    updateTransaction(transaction){
        
        //check if transaction already exists.
        let transactionId = this.transactions.find(t => t.id === transaction.id);

        if (transactionId){
            this.transactions[this.transactions.indexOf(transactionId)] = transaction;
        } 
        else {
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address) {
        return this.transactions.find(t => t.input.address === address);
    }
}

module.exports = TransactionPool;