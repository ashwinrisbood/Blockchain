const Block = require('./core/block');
const dateTime = require('node-datetime');
const Blockchain = require('./core/blockchain');
const Wallet = require('./wallet/wallet')
const Transaction = require('./wallet/transaction');

const blockchain = new Blockchain();
// const bluckchen = new Blockchain();
// bluckchen.appendBlock("deraan");
// const block1 = new Block(DateTime.now,  "123141", "12254141", "noob!!!")
// const block2 = new Block(DateTime.now, "asdasdasd12413", "123445q2413243", "hellow!!");

// const testBlock = Block.mineBlock(Block.genesis(), 'someData');
// const block = Block.

// testBlock.appendBlock("noob!!!")

// console.log(blockchain.chain[0].toString());
// console.log(bluckchen.chain[0].toString());
// console.log(blockchain.replaceChain(bluckchen));

/*
Testing dynamic difficulty
*/

// blockchain.appendBlock("testdata1");
// blockchain.appendBlock("testdata2");
// blockchain.appendBlock("testdata3");
// blockchain.appendBlock("testdata4");

/*
Wallets
*/
console.log(blockchain.chain.forEach((i) => i.toString()));

const wallet = new Wallet();
console.log(wallet.toString());

const transaction = Transaction.newTransaction(wallet, 'somerecipient', 30);

console.log(Transaction.verifyTransaction(transaction));
console.log(transaction.input);

//tamper the transaction
// transaction.output[0].amount = 30000;
//  console.log(Transaction.verifyTransaction(transaction));

 // updating transactions 
 let moreMoney = 100;
 let moreRecipients = 'morerecipient'
 let moreTransaction = transaction.update(wallet, moreRecipients, moreMoney);

 console.log(transaction.output.forEach(out => {
     console.log(`amount: ${out.amount}, ${out.address}`)   
 }))


