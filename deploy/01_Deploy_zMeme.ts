import { ethers } from "hardhat";
import {DeployFunction} from 'hardhat-deploy/types';
import { network,run } from "hardhat"
import * as dotenv from "dotenv"
import { PEPEPEToken } from "../typechain-types";
import { AddressLike } from "ethers";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import { verify } from "../scripts/verify";

dotenv.config({ path: '/Users/yamishka/Documents/Projects/MemeToken_v2/data.env' })

const TEAM = process.env.TEAM as AddressLike
const TOKEN_OWNER = process.env.TOKEN_OWNER as AddressLike
const TOKEN_OWNER_SHARE = process.env.TOKEN_OWNER_SHARE as string
const TOKEN_SUPPLY = ethers.toBigInt(process.env.TOKEN_SUPPLY as string) * 10n ** 18n
const TEAM_SHARE = process.env.TEAM_SHARE as string


async function transferTokensToOwner(TOKEN_OWNER:AddressLike,contract:PEPEPEToken,sharePercent:number){
  console.log('\n Transfering share to owner...')
  const supply = await contract.totalSupply()
  const toTransfer = (supply * BigInt(sharePercent)) / 1000n
  await contract.transfer(TOKEN_OWNER,toTransfer)

  console.log('Share transfered!\n')
}
async function transferTokensToTeam(TEAM:AddressLike,contract:PEPEPEToken,sharePercent:number){
  console.log('\n Transfering share to team...')
  const supply = await contract.totalSupply()
  const toTransfer = (supply * BigInt(sharePercent)) / 1000n
  await contract.transfer(TEAM,toTransfer)

  console.log('Share transfered!\n')
}






const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments, getChainId }) => {
  
  
  if(Number(TEAM_SHARE)+Number(TOKEN_OWNER_SHARE) > 1000){//проверка на то что мы не высылаем больше 100% токенов
      throw Error("__________Incorrect SHARE___________");
  }

  const { deploy, log } = deployments
  const [ deployer ] = await ethers.getSigners()



  console.log("[DEPLOYER_ADDRESS]",deployer.address)
  console.log("[Network]", network.name)
  console.log('\nDeploying token...\n')

  const waitBlockConfirmations: number = developmentChains.includes(network.name)
  ? 1
  : VERIFICATION_BLOCK_CONFIRMATIONS

  const contract = await deploy("PEPEPEToken", {
    from: deployer.address,
    args: [TOKEN_SUPPLY],
    log: true,
    waitConfirmations: waitBlockConfirmations
  })

  let TOKEN_CONTRACT = await ethers.getContractAt("PEPEPEToken",contract.address) as PEPEPEToken


  console.log("Successfully deployed!\n")
  console.log('[CONTRACT_ADDRESS]', await TOKEN_CONTRACT.getAddress())


  await transferTokensToOwner(TOKEN_OWNER, TOKEN_CONTRACT, parseInt(TOKEN_OWNER_SHARE))
  /*
  await transferTokensToTeam(TEAM,TOKEN_CONTRACT,parseInt(TEAM_SHARE))
  */
  await TOKEN_CONTRACT.transferOwnership(TOKEN_OWNER)
  

  //Verify contract
  await run(`verify:verify`, {
    address: await TOKEN_CONTRACT.getAddress(),
    constructorArguments: [TOKEN_SUPPLY],
  });
}

export default deployFunction
deployFunction.tags = [`all`, `token`]