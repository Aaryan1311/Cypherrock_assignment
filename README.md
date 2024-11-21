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


