
const { ethers, network } = require("hardhat");

async function latestBlock () {
  const block = await ethers.provider.getBlock('latest');
  return block.number;
}

async function latestBlockNum () {
  const block = await ethers.provider.getBlock('latest');
  return block.number;
}


async function showBlock () {
    const block = await ethers.provider.getBlock('latest');
    console.log("Block number: " + block.number);
  }

async function showBlockMsg (msg) {
    const block = await ethers.provider.getBlock('latest');
    console.log(msg + " at block number: " + block.number);
  }

async function stopAutoMine() {
    //stop auto mine or it will mess the block number
    await network.provider.send("evm_setIntervalMining", [600000])
    // await network.provider.send("evm_setAutomine", [false])
}

function advanceBlock () {
  // return network.provider.send("evm_mine", [new Date().getTime()])
  return network.provider.send("evm_mine", [])
}


// Advance the block to the passed height
async function advanceBlockTo (target) {
    // stop interval mint,set to 600s
  await stopAutoMine()
  target = Number(target);

  const currentBlock = (await latestBlock());
  const start = Date.now();
  let notified;
  if (target < currentBlock) throw Error(`Target block #(${target}) is lower than current block #(${currentBlock})`);
  while ((await latestBlock()) < target) {
    if (!notified && Date.now() - start >= 5000) {
      notified = true;
      console.log('advanceBlockTo: Advancing too many blocks may be slow.');
    }
    await advanceBlock();
  }
  await showBlockMsg('arrive')
}

// Returns the time of the last mined block in seconds
async function latest () {
    const block = await ethers.provider.getBlock('latest');
    return block.timestamp;
  }

async function increase(seconds) {
  await network.provider.send("evm_increaseTime", [seconds])
  await advanceBlock();
}


module.exports = {
    advanceBlockTo,
    advanceBlock,
    latestBlock,
    latestBlockNum,
    showBlock,
    stopAutoMine,
    latest,
    increase
};
