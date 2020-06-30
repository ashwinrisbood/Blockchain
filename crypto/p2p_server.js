const webs = require('ws');

const peers= process.env.PEERS? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        console.log("p2p listening on port 8000...");
        const server = new webs.Server({
            port: 8000
        });

        server.on('connection', sock => this.connectSocket(sock));
        this.connectToPeers();
    }

    connectSocket(sock){
        this.sockets.push(sock);
        console.log("sock connected!");
    }

    connectToPeers(){
        peers.forEach(peer => {
            const sock = new webs(peer);

            sock.on('open', () => this.connectSocket(sock));
        });
    }
}

module.exports = P2pServer;