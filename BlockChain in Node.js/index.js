// May you do good and not evil
// May you find forgiveness for yourself and forgive others
// May you share freely, never taking more than you give.
const blockchain = require('./blockchain');

blockchain.boot();

console.log("Mining 100 blocks...");
for (let i = 0; i < 100; i++) {
    const block = blockchain.mine(
        `Recorded ${Math.random()}`,
        0.01
    );

    console.log("Block", i, "mined:");
    console.log(
      JSON.stringify(block, null, 2)
    );
    console.log("--------------------------------");
}