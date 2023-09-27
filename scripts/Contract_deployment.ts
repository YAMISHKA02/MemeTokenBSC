import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Address } from "cluster";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { exec } from "child_process";
import { PEPEPEToken,PEPEPEToken__factory } from "../typechain-types";
import * as dotenv from "dotenv"
import { AddressLike } from "ethers";

dotenv.config({ path: '/Users/yamishka/Documents/Projects/MemeToken_v2/data.env' })

async function main(){
    const [deployer] = await ethers.getSigners()
    await deployments.fixture(['token'])
    let TOKEN_CONTRACT = await ethers.getContract("PEPEPEToken") as PEPEPEToken
    console.log('deployment script done: token address:', await TOKEN_CONTRACT.getAddress())
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });