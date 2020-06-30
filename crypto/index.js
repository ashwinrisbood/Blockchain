const express = require('express');
const Blockchain = require('../core/blockchain');
const bp  = require('body-parser');
const P2pServer = require('./p2p_server');

const HTTP_PORT = 3001;

const crypto = express();
const blockChain  = new Blockchain();
const p2p = new P2pServer(blockChain);

crypto.use(bp.json());

crypto.get('/blocks', (req, res) => {
    res.json(blockChain.chain);
});

crypto.post('/mine', (req, res) => {
    const block = blockChain.appendBlock(req.body.data);
    console.log(block.toString() + "   added!!");

    res.redirect('/blocks');
})

crypto.listen(3000, () => console.log('listening on port 3000!'));
p2p.listen();