// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run, network } from "hardhat";
import { Seaport } from "@opensea/seaport-js";
import { parseEther } from "ethers/lib/utils";
import { ItemType } from "@opensea/seaport-js/lib/constants";

async function main() {
  const developmentChains = ["hardhat", "localhost"];

  // Instantiating the Seaport
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RINKEBY_URL || "http://localhost:8545"
  );
  const seaport = new Seaport(provider);

  // Deploying the NFT contract
  const Minter = await ethers.getContractFactory("Minter");
  const minter = await Minter.deploy();
  await minter.deployed();

  console.log("NFT deployed to:", minter.address);

  // Deploying the Seaport contract
  const Market = await ethers.getContractFactory("Market");
  const market = await Market.deploy();
  await market.deployed();

  console.log("Market is now open at:", market.address);

  // Verifying the contract on Etherscan
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(minter.address, []);
    await verify(market.address, []);
  }

  // Haven't figured out a way to get the offerer and fulfiller so
  //  I'm hardcoding them here till I do just like the seaport-js docs
  const offerer = market.offerer;
  const fulfiller = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";

  const { executeAllActions } = await seaport.createOrder({
    offer: [
      {
        itemType: ItemType.ERC721,
        token: minter.address,
        identifier: "1",
      },
    ],
    consideration: [
      {
        itemType: ItemType.ERC1155,
        amount: parseEther("10").toString(),
        recipient: offerer,
      },
    ],
  });

  const order = await executeAllActions();

  const { executeAllActions: executeAllFulfillActions } =
    await seaport.fulfillOrder({
      order,
      accountAddress: fulfiller,
    });

  const transaction = executeAllFulfillActions();
  console.log("Transaction:", transaction);
}

async function verify(contractAddress: string, args: any) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err: any) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(err);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
