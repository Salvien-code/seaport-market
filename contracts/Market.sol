// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

error Market__isOfferer();

contract Market {
    address immutable public offerer;

    constructor () {
        offerer = msg.sender;
    }

    function getOfferer() public view returns (address) {
        return offerer;
    }

    function getFulfiller() external view returns (address) {
        // Offerer shouldn't try to purchase from the market.
        if (msg.sender == offerer) {
            revert Market__isOfferer();
        } else {
            return msg.sender;
        }
    }
}