const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    appendBlock(data) {
        const lastBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);
        return block;
    }

    static Validate(chain) {
        console.log(JSON.stringify(chain[0]));
        console.log(JSON.stringify(Block.genesis()));
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

        for (let i=1; i<chain.length; i++)
        {
            if(chain[i-1].hash !== chain[i].lastHash || 
            chain[i].hash !== chain[i].getHash(chain[i])) return false;
        }

        return true;
    }

    replaceChain(chain) {
        if(chain.length<=this.chain.length || Blockchain.Validate(chain)){
            console.log("invalid length");
            return;
        }
        
        this.chain = chain;
        console.log("Blockchain replaced!!!");
    }
}

module.exports = Blockchain;