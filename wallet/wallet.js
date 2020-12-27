
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

    checkBalance(blockchain) {
        let balance = this.balance;
        let allTransactions = [];
        let thisWalletTransactions = [];
        blockchain.chain.forEach(block =>  {
            block.data.forEach(transaction => {
                allTransactions.push(transaction);
                if (transaction.input.address === this.publicKey) {
                    thisWalletTransactions.push(transaction);
                }
            })   
        });

        if (thisWalletTransactions.length > 0) {
            const latestTransactions = thisWalletTransactions.reduce(
                (max, cur) => {
                    max.input.timestamp > cur.input.timestamp? max : cur
            })

            balance = latestTransactions.output.find(out => out.address === this.publicKey).amount;
            const lastTimestamp = latestTransactions.input.timestamp;
            allTransactions.forEach(transaction => {
                if(transaction.input.timestamp > lastTimestamp){
                    transaction.output.forEach(out => {
                        if(out.address === this.publicKey) {
                            balance += out.amount;
                        }
                    })
                }
            })
        }
        
        return balance;
    }

    static cryptoWallet() {
        const wallet = new this();
        wallet.address = 'crypto-wallet';
        return wallet;
    }
    
    toString(){
        return `Wallet:-
           publicKey: ${this.publicKey.toString()}
           balance  : ${this.balance}`
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, tp, blockChain) {
        this.balance = this.checkBalance(blockChain)

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