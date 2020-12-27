const webs = require('ws');

const P2P_PORT = process.env.P2P_PORT || 8000;
const peers= process.env.PEERS? process.env.PEERS.split(',') : [];

const MESSAGE_TYPE = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION',
    clearTransactions: 'CLEAR'
};

class P2pServer {
    constructor(blockchain, transactionPool){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = [];
    }

    listen() {
        console.log(`p2p listening on port ${P2P_PORT }...`);
        const server = new webs.Server({
            port: P2P_PORT
        });

        server.on('connection', sock => this.connectSocket(sock));
        this.connectToPeers();
    }

    connectSocket(sock){
        this.sockets.push(sock);
        console.log("sock connected!");
        this.messageHandler(sock);
        this.sendChain(sock);
    }

    connectToPeers(){
        peers.forEach(peer => {
            const sock = new webs(peer);

            sock.on('open', () => this.connectSocket(sock));
        });
    }

    messageHandler(sock){
        sock.on('message', (msg) => {
            const data = JSON.parse(msg);

            switch(data.type) {
                case MESSAGE_TYPE.chain:  this.blockchain.replaceChain(data.chain); break;
                case MESSAGE_TYPE.transaction: this.transactionPool.updateTransaction(data.transaction); break;
                case MESSAGE_TYPE.clearTransactions: this.transactionPool.transactions = []; break;
            }
        });
    }

    sendChain(sock){
        sock.send(JSON.stringify(
            {   
                type: MESSAGE_TYPE.chain,
                chain: this.blockchain.chain 
            }
        ));
    }

    sendTransaction(sock, transaction) {
        sock.send(JSON.stringify(
            {   
                type: MESSAGE_TYPE.transaction,
                transaction: transaction
            }
        ));
    }
    
    syncChains() {
        this.sockets.forEach(sock => {
            this.sendChain(sock);
        });
    }

    syncTransaction(transaction) {
        this.sockets.forEach(sock => {
            this.sendTransaction(sock, transaction);
        });
    }

    syncClear() {
        this.sockets.forEach(sock => sock.send(JSON.stringify({
            type: MESSAGE_TYPE.clearTransactions
        })))
    }
}

module.exports = P2pServer;