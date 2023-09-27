import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers"
import "hardhat-deploy"
import '@nomicfoundation/hardhat-verify'
import * as dotenv from "dotenv"


dotenv.config({ path: '/Users/yamishka/Documents/Projects/MemeToken_v2/data.env' })

const DEPLOYER_MNEMONIC:string | undefined = process.env.DEPLOYER_MNEMONIC 
const ETH_API = process.env.ETH_API
const config: HardhatUserConfig = {

  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },

  networks:{
    hardhat: {
      chainId: 31337,
    },
    BSC_testnet:{
      url: "https://bsc-testnet.blockpi.network/v1/rpc/public",
      chainId: 97,
      gasPrice: 4000000000,
      accounts: DEPLOYER_MNEMONIC !== undefined ? [DEPLOYER_MNEMONIC]:[]
    },
    BSC_mainnet: {
      url: "https://rpc.ankr.com/bsc",
      chainId: 56,
      gasPrice: 1500000000,
      accounts: DEPLOYER_MNEMONIC !== undefined ? [DEPLOYER_MNEMONIC]:[]
    }
  },
  etherscan: {
    apiKey: ETH_API
  },
  mocha: {
    timeout: 20000
  }
};

export default config;
