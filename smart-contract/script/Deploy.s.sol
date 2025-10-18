// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ReTrust.sol";
import "../src/Escrow.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        Escrow escrow = new Escrow();
        ReTrust retrust = new ReTrust(payable(address(escrow)));
        escrow.setMarketplace(address(retrust));

        vm.stopBroadcast();
    }
}
