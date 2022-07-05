// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Minter is ERC721 {
  event Log(address indexed sender, string text);

  constructor() ERC721("SimonNFT", "SXT") {
    console.log("Deploying Simon NFT");
    emit Log(msg.sender, "The smart contract has been deployed");
  }
}
