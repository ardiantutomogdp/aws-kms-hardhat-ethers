import { AlchemyProvider, getNetwork } from "@ethersproject/providers";
import { AwsKmsSigner, AwsKmsSignerCredentials } from "ethers-aws-kms-signer";
require("dotenv").config();

async function main() {
  const AWS_KMS_KEY_ID = process.env.AWS_KMS_KEY_ID || "";
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
  const AWS_REGION = process.env.AWS_REGION || "";
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
  const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";
  const CHAIN_ID = process.env.CHAIN_ID || 1337;

  const KMS_CREDENTIAL = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
    keyId: AWS_KMS_KEY_ID,
  } as AwsKmsSignerCredentials;

  const network = getNetwork(Number(CHAIN_ID));
  const PROVIDER = new AlchemyProvider(network, ALCHEMY_KEY);
  const signer = new AwsKmsSigner(KMS_CREDENTIAL).connect(PROVIDER);
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
