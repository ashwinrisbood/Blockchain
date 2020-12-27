const Transaction = require("../wallet/transaction");
const Wallet = require('../wallet/wallet')

class Miner {
    
    constructor(blockchain, transactionPool, wallet, p2p) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet
        this.p2p = p2p;
    }

    mine() {
        const validTransactions = this.transactionPool.validTransactions();
        let cryptoTransaction = Transaction.cryptoTransaction(this.wallet, Wallet.cryptoWallet());
        validTransactions.push(cryptoTransaction);
        const block = this.blockchain.appendBlock(validTransactions);
        this.p2p.syncChains();
        this.transactionPool.transactions = []
        this.p2p.syncClear();

        return block;
    }
}

module.exports = Miner;