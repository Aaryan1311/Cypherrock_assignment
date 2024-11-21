const BitcoinCore = require("bitcoin-core");
const bip39 = require("bip39");
const hdkey = require("hdkey");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const dotenv = require("dotenv");

dotenv.config();

const rpcConfig = {
  username: process.env.API_USER,
  password: process.env.API_KEY,
  network: "testnet",
};

const client = new BitcoinCore(rpcConfig);

// Utility to save wallet data to a file
const saveWalletToFile = async (wallet) => {
  const filePath = `./wallets/${wallet.id}.json`;
  await fs.writeFile(filePath, JSON.stringify(wallet, null, 2));
  console.log(`Wallet saved: ${filePath}`);
};

// Creates a new wallet with a randomly generated mnemonic
const createWallet = async () => {
  try {
    const mnemonic = bip39.generateMnemonic();
    const wallet = {
      id: uuidv4(),
      mnemonic,
    };
    await saveWalletToFile(wallet);
    console.log("New wallet created:");
    console.log(`- ID: ${wallet.id}`);
    console.log(`- Mnemonic: ${wallet.mnemonic}`);
  } catch (error) {
    console.error("Error creating wallet:", error.message);
  }
};

// Imports a wallet using a provided BIP39 mnemonic
const importWallet = async (mnemonic) => {
  try {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error("Invalid BIP39 mnemonic.");
    }
    const id = uuidv4();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString("hex");
    const wallet = {
      id,
      mnemonic,
      masterPrivateKey,
    };
    await saveWalletToFile(wallet);
    console.log("Wallet imported:");
    console.log(`- ID: ${id}`);
  } catch (error) {
    console.error("Error importing wallet:", error.message);
  }
};

// Lists all wallets in the "wallets" directory
const listWallets = async () => {
  try {
    const walletFiles = await fs.readdir("./wallets");
    console.log("Available wallets:");
    for (const file of walletFiles) {
      const content = await fs.readFile(`./wallets/${file}`, "utf8");
      const wallet = JSON.parse(content);
      console.log(`- ID: ${wallet.id}`);
    }
  } catch (error) {
    console.error("Error listing wallets:", error.message);
  }
};

// Fetches the Bitcoin balance for a specific wallet
const getBalance = async (walletId) => {
  try {
    const walletFile = `./wallets/${walletId}.json`;
    const walletData = await fs.readFile(walletFile, "utf8");
    const wallet = JSON.parse(walletData);
    const address = await client.getNewAddress(wallet.id);
    const balance = await client.getReceivedByAddress(address);
    console.log(`Wallet ID: ${walletId}\nBalance: ${balance} BTC`);
  } catch (error) {
    console.error("Error fetching wallet balance:", error.message);
  }
};

// Fetches transactions associated with a specific wallet
const getTransactions = async (walletId) => {
  try {
    const walletFile = `./wallets/${walletId}.json`;
    const walletData = await fs.readFile(walletFile, "utf8");
    const wallet = JSON.parse(walletData);
    const address = await client.getNewAddress(wallet.id);
    const transactions = await client.listTransactions("*", 100, 0, true);
    const walletTransactions = transactions.filter((tx) => tx.address === address);
    console.log(`Transactions for Wallet ID: ${walletId}`);
    walletTransactions.forEach((tx) => {
      console.log(`- TXID: ${tx.txid}, Amount: ${tx.amount}, Confirmations: ${tx.confirmations}`);
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
  }
};

// Generates a new Bitcoin address for a wallet
const generateAddress = async (walletId) => {
  try {
    const walletFile = `./wallets/${walletId}.json`;
    const walletData = await fs.readFile(walletFile, "utf8");
    const wallet = JSON.parse(walletData);
    const seed = await bip39.mnemonicToSeed(wallet.mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const addressNode = root.derive("m/0'/0'/0'");
    const { address } = await client.command("getnewaddress", "", "bech32");
    console.log(`New Address for Wallet ID ${walletId}: ${address}`);
  } catch (error) {
    console.error("Error generating address:", error.message);
  }
};

module.exports = {
  createWallet,
  importWallet,
  listWallets,
  getBalance,
  getTransactions,
  generateAddress,
  client,
};
