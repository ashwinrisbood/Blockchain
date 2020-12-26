const express = require('express');
const Blockchain = require('../core/blockchain');
const bp  = require('body-parser');
const P2pServer = require('./p2p_server');
const Wallet = require('../wallet/wallet')
const TransactionPool = require('../wallet/transaction-pool')

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const wallet = new Wallet();
const tp = new TransactionPool();

const crypto = express();
const blockChain  = new Blockchain();
const p2p = new P2pServer(blockChain, tp);

crypto.use(bp.json());

crypto.get('/blocks', (req, res) => {
    res.json(blockChain.chain);
});

crypto.post('/mine', (req, res) => {
    const block = blockChain.appendBlock(req.body.data);
    console.log(block.toString() + "   added!!");

    p2p.syncChains();
    res.redirect('/blocks');
})

crypto.get('/transactions', (req, res) => {
    res.json(tp.transactions);
});

crypto.post('/transact', (req, res) => {
    const {recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);

    p2p.syncTransaction(transaction);
    res.redirect('/transactions');
});

crypto.get('/public-key', (req, res) => {
    res.json({ publicKey: wallet.publicKey });
});

crypto.listen(HTTP_PORT, () => console.log(`listening on port ${HTTP_PORT}!`));
p2p.listen();