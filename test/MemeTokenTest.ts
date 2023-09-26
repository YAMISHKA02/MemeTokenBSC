import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Address } from "cluster";
import { expect } from "chai";
import { ethers, deployments } from "hardhat";
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { exec } from "child_process";
import { PepeToken, PepeToken__factory } from "../typechain-types";
import * as dotenv from "dotenv"
import { AddressLike } from "ethers";

describe("MemeTokenFlow", function () {
  
  dotenv.config({ path: '/Users/yamishka/Documents/Projects/MemeToken_v2/.env.data' })

  const TEAM = process.env.TEAM as AddressLike
  const TOKEN_OWNER = process.env.TOKEN_OWNER as AddressLike
  const TOKEN_SUPPLY = ethers.toBigInt(process.env.TOKEN_SUPPLY as string) * 10n ** 18n
  
  
  let Deployer: SignerWithAddress
  let User: SignerWithAddress
  let UniswapV2Pair: SignerWithAddress
  let Meme: PepeToken__factory
  let meme: PepeToken


  before(async ()=>{
    [Deployer,User,UniswapV2Pair] = await ethers.getSigners()
    
    await deployments.fixture([`all`])

    meme = await ethers.getContract("PepeToken", Deployer)
  })
  it("Should to deploy",async () => {
    console.log('[Total Supply]',await meme.totalSupply())
    console.log("[DEPLOYER_BALANCE]", await meme.balanceOf(Deployer.address))
    console.log("[Team]", await meme.balanceOf(TEAM))
    console.log("[TOKENOWNER_BALANCE]", await meme.balanceOf(TOKEN_OWNER),"\n")
    console.log('[Owner]', await meme.owner())
    console.log('[CONTRACT_ADDRESS]',await meme.getAddress())
  })
  it("Should to transfer only from owner and to owner",async () => {

  })
 
  

})

