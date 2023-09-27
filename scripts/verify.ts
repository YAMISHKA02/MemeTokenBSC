import { ethers, network, run } from "hardhat";
import "@nomiclabs/hardhat-etherscan";
import hre from 'hardhat'
import * as dotenv from "dotenv"
dotenv.config({ path: '/Users/yamishka/Documents/Projects/MemeToken_v2/data.env' })

const TOKEN_SUPPLY = ethers.toBigInt(process.env.TOKEN_SUPPLY as string) * 10n ** 18n


export const verify = async (contractAddress: string, args: any[]) => {
    await run(`verify:verify`, {
        address: contractAddress,
        constructorArguments: args,
      });
}

