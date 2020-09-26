const ChainUtil = require('../chain-util');

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.output = [];
    }

    static newTransaction(sendersWallet, recipient, amount) {
        const transaction = new this();
        if (amount > sendersWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance.`);
            return;
        }

        transaction.output.push(...[
            { amount: sendersWallet.balance - amount, address: sendersWallet.publicKey },
            { amount: amount, address: recipient}
        ])

        Transaction.signTransaction(transaction, sendersWallet);
        return transaction;

    }
    static signTransaction(transaction, sendersWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: sendersWallet.balance,
            address: sendersWallet.publicKey,
            signature: sendersWallet.sign(ChainUtil.hash(transaction.output))
        }
    }

    static verifyTransaction(transaction) {
        return ChainUtil.verifySignature(
             transaction.input.address,
             transaction.input.signature,
             ChainUtil.hash(transaction.output)
        );
    }
}

module.exports = Transaction;