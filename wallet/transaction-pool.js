const { mode } = require("crypto-js");
const Transaction  = require("./transaction") 

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

    validTransactions() {
        this.transactions.forEach(transaction => console.log(transaction.output.reduce((total, out) => {
            return total + out.amount;
        }, 0)))
        return this.transactions.filter(transaction => {
            const count = transaction.output.reduce((total, out) => {
                return total + out.amount;
            }, 0);

            if (transaction.input.amount !== count ) {
                console.log(`invalid transaction from ${transaction.input.address}`);
                return;
            }

            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`invalid signature from from ${transaction.input.address}`);
                return;
            }

            return transaction;
        });
    }
}

module.exports = TransactionPool;