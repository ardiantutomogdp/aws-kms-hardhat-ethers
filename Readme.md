# AWS KMS in Ethers.js and hardhat

This is an example of using AWS KMS in Ethers.js and Hardhat

## Step by Step

- Install all the dependencies
- Create .env file based on .env.example file (protocol and web2)
- Navigate to protocol folder
- `npm run get-wallet-address` to get wallet address
- `npm run deploy:goerli` to deploy smart contract
- Navigate to web2 folder
- `npm run start` to run simple application that use AwsKmsSigner for signing transaction in ethers.js
