import { AlchemyProvider, getNetwork } from "@ethersproject/providers";
import { KMSSigner } from "@rumblefishdev/eth-signer-kms";
import { ethers } from "ethers";
import HelloWorld from "../../protocol/artifacts/contracts/HelloWorld.sol/HelloWorld.json";
require("dotenv").config();

const AWS_KMS_KEY_ID = process.env.AWS_KMS_KEY_ID || "";
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";
const CHAIN_ID = process.env.CHAIN_ID || 1337;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";

async function main() {
  const network = getNetwork(Number(CHAIN_ID));
  const provider = new AlchemyProvider(network, ALCHEMY_KEY);
  const signer = new KMSSigner(provider, AWS_KMS_KEY_ID);

  console.log("Wallet address: " + (await signer.getAddress()));
  const contract = getContract(signer);
  let message = await contract["message"]();
  console.log("Initial message:" + message);

  const tx = await contract["setMessage"]("new Message");
  await tx.wait();

  message = await contract["message"]();
  console.log("current message:" + message);
}

function getContract(signer: KMSSigner) {
  return new ethers.Contract(CONTRACT_ADDRESS, HelloWorld.abi, signer);
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
