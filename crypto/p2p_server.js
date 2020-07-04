const webs = require('ws');

const P2P_PORT = process.env.P2P_PORT || 8000;
const peers= process.env.PEERS? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
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
            this.blockchain.replaceChain(data);
        });
    }

    sendChain(sock){
        sock.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach(sock => {
            this.sendChain(sock);
        });
    }
}

module.exports = P2pServer;