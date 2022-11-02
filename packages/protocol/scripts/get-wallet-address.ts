import { AlchemyProvider, getNetwork } from "@ethersproject/providers";
import { KMSSigner } from "@rumblefishdev/eth-signer-kms";
require("dotenv").config();

async function main() {
  const AWS_KMS_KEY_ID = process.env.AWS_KMS_KEY_ID || "";
  const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";
  const CHAIN_ID = process.env.CHAIN_ID || 1337;

  const network = getNetwork(Number(CHAIN_ID));
  const provider = new AlchemyProvider(network, ALCHEMY_KEY);
  const signer = new KMSSigner(provider, AWS_KMS_KEY_ID).connect(provider);
  console.log("Wallet address: " + (await signer.getAddress()));
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
