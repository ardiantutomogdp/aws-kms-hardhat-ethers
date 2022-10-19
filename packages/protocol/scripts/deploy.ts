import { ethers } from "hardhat";

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy("hello");

  await helloWorld.deployed();

  console.log(`Deployed to ${helloWorld.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
