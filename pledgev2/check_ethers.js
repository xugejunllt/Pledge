const { ethers } = require("hardhat");
const ethersDirect = require("ethers");

async function main() {
  console.log("Direct require('ethers') version:", ethersDirect.version);
  
  // Hardhat's ethers object might not have a .version property directly on the root object in v5 plugins, 
  // but let's check providers or just try to inspect it.
  // Usually ethers.version works if it's the standard lib.
  console.log("Hardhat Runtime Environment ethers version:", ethers.version);
  
  try {
      // Check if it supports v5 style provider
      const provider = ethers.provider;
      console.log("Provider exists:", !!provider);
      
      // Check for BigNumber (v5) vs BigInt (v6)
      const isV5BN = ethers.BigNumber && ethers.BigNumber.from("1")._isBigNumber;
      console.log("Has v5 BigNumber:", !!isV5BN);
      
  } catch (e) {
      console.log("Error checking properties:", e.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
