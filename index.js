const {
  createWallet,
  importWallet,
  listWallets,
  client,
} = require("./bitcoin");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .command(
    "create",
    "Create a new wallet",
    (yargs) => yargs,
    () => {
      createWallet();
    }
  )
  .command(
    "import <mnemonic>",
    "Import a wallet using a BIP39 mnemonic phrase",
    (yargs) => {
      yargs.positional("mnemonic", {
        describe: "The mnemonic phrase to import the wallet",
        type: "string",
      });
    },
    (args) => {
      importWallet(args.mnemonic);
    }
  )
  .command(
    "list",
    "Show all available wallets",
    (yargs) => yargs,
    () => {
      listWallets();
    }
  )
  .command(
    "balance <walletId>",
    "Retrieve the Bitcoin balance of a specific wallet",
    (yargs) => {
      yargs.positional("walletId", {
        describe: "The unique identifier of the wallet",
        type: "string",
      });
    },
    async (args) => {
      try {
        const balance = await client.getBalance(args.walletId);
        console.log(`Wallet ID: ${args.walletId}\nBalance: ${balance} BTC`);
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      }
    }
  )
  .command(
    "transactions <walletId>",
    "Display all transactions for a specific wallet",
    (yargs) => {
      yargs.positional("walletId", {
        describe: "The unique identifier of the wallet",
        type: "string",
      });
    },
    async (args) => {
      try {
        const transactions = await client.listTransactions(args.walletId);
        console.log(
          `Wallet ID: ${args.walletId}\nTransactions:\n${JSON.stringify(
            transactions,
            null,
            2
          )}`
        );
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    }
  )
  .command(
    "address <walletId>",
    "Generate a new Bitcoin address for the specified wallet",
    (yargs) => {
      yargs.positional("walletId", {
        describe: "The unique identifier of the wallet",
        type: "string",
      });
    },
    async (args) => {
      try {
        const newAddress = await client.getNewAddress(args.walletId);
        console.log(`Wallet ID: ${args.walletId}\nNew Address: ${newAddress}`);
      } catch (error) {
        console.error("Error generating address:", error.message);
      }
    }
  )
  .help()
  .alias("help", "h")
  .demandCommand(1, "Please specify at least one command.")
  .strict()
  .parse();
