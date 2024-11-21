# Cypherrock Assignment

## About
This repository contains a nodejs CLI tool for handling bitcoin wallets. All operations work with bitcoin testnet. The wallet that we create are BIP39 Mnenomics wallets. The address that we generate are BIP44 addresses. The tool uses the blockchain.info API for fetching the wallet balance and transactions. The bitcoin wallets can have multiple addresses
This assignment contains a nodejs CLI tool build using yargs which handles the bitcoin wallet actions as follows:
- Creating a wallet (BIP39 Wallet)
- Importing from a wallet (from BIP39 Mnemonics)
- Getting the balance of a wallet
- Listing all the transactions of a wallet
- Listing all wallets 
- Generating an unused bitcoin address from a wallet

## Packages 
- yargs - For handling the CLI arguments
- bitcoinjs-lib - For creating and importing wallets
- axios - For making HTTP requests to the blockchain API
- bip39 - For generating mnemonics
- hdkey - For generating keys from mnemonics
- node-localstorage - For storing the wallets in the local storage

## APIs 
- To accomplish the given task we needed API's to communicate with the blockchain network. 
- The API is available on https://www.blockcypher.com/
- Use the API from the given link and paste it into a .env file in the directory to run the cli commands.

## Input-Output
- The input to the CLI tool is given as arguments to the commands.
- The output of the CLI tool is displayed on the console.

## Input-Output
- The input to the CLI tool is given as arguments to the commands.
- The output of the CLI tool is displayed on the console.

### Input

console
Commands:
  index.js create                   Create a new wallet
  index.js import <mnemonic>        Import a wallet using a BIP39 mnemonic
                                    phrase
  index.js list                     Show all available wallets
  index.js balance <walletId>       Retrieve the Bitcoin balance of a specific
                                    wallet
  index.js transactions <walletId>  Display all transactions for a specific
                                    wallet
  index.js address <walletId>       Generate a new Bitcoin address for the
                                    specified wallet

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]


### Outputs

console
$ node index.js create
Wallet saved: ./wallets/d267d8c2-31fb-45c2-accd-4f61ffa3601a.json
New wallet created:
- ID: d267d8c2-31fb-45c2-accd-4f61ffa3601a
- Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

$ node index.js import "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
Wallet saved: ./wallets/p867d2c2-31fb-37dl-mcrd-4f61ffa3fes5.json
New wallet created:
- ID: p867d2c2-31fb-37dl-mcrd-4f61ffa3fes5
- Mnemonic: pizza rule guess vapor seek mention major document snap bargain cruise blame

$ node index.js list
Available wallets:
- ID: p867d2c2-31fb-37dl-mcrd-4f61ffa3fes5
- ID: d267d8c2-31fb-45c2-accd-4f61ffa3601a
- ID: 0fffa629-aec2-427d-b92a-7f1e6d9b2bba
- ID: 2066191b-21f2-4ddf-a2e4-dea7a91bfb86

$ node index.js balance d267d8c2-31fb-45c2-accd-4f61ffa3601a
Balance: 0.00000000 BTC

$ node index.js transactions d267d8c2-31fb-45c2-accd-4f61ffa3601a
No transactions found

$ node index.js address d267d8c2-31fb-45c2-accd-4f61ffa3601a
Address: 2N3JZ6QpQ5
