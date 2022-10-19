import "@nomiclabs/hardhat-ethers";
import "@rumblefishdev/hardhat-kms-signer";
import { HardhatUserConfig } from "hardhat/config";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      kmsKeyId: `${process.env.AWS_KMS_KEY_ID}`,
    },
  },
};

export default config;
