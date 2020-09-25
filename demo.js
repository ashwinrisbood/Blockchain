const Block = require('./core/block');
const DateTime = require('node-datetime/src/datetime');
const Blockchain = require('./core/blockchain');

const blockchain = new Blockchain();

const bluckchen = new Blockchain();
bluckchen.appendBlock("deraan");
// const block1 = new Block(DateTime.now,  "123141", "12254141", "noob!!!")
// const block2 = new Block(DateTime.now, "asdasdasd12413", "123445q2413243", "hellow!!");

// const testBlock = Block.mineBlock(Block.genesis(), 'someData');
// const block = Block.

// testBlock.appendBlock("noob!!!")

console.log(blockchain.chain[0].toString());
console.log(bluckchen.chain[0].toString());
console.log(blockchain.replaceChain(bluckchen));