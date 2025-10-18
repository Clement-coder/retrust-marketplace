// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ReTrust.sol";
import "../src/Escrow.sol";

contract ReTrustTest is Test {
    ReTrust public market;
    Escrow public escrow;

    address seller = address(0x1);
    address buyer = address(0x2);

    function setUp() public {
        escrow = new Escrow();
        market = new ReTrust(address(escrow));
        escrow.setMarketplace(address(market));
    }

    function testUserRegistration() public {
        vm.prank(seller);
        market.registerUser("Clem", "Mangu");

        (string memory username, string memory location, uint256 reputation, bool registered) = market.users(seller);
        assertEq(username, "Clem");
        assertEq(location, "Mangu");
        assertEq(reputation, 0);
        assertEq(registered, true);
    }

    function testProductListing() public {
        vm.startPrank(seller);
        market.registerUser("Clem", "Mangu");
        market.listProduct("Laptop", "Used HP EliteBook", 1 ether);
        vm.stopPrank();

        (uint256 id_, address seller_, string memory name, string memory description, uint256 price, bool sold) = market.products(1);
        assertEq(seller_, seller);
        assertEq(name, "Laptop");
        assertEq(price, 1 ether);
        assertEq(sold, false);
    }

    function testEscrowFlow() public {
        vm.startPrank(seller);
        market.registerUser("Seller", "Jos");
        market.listProduct("Phone", "Used iPhone 13", 1 ether);
        vm.stopPrank();

        vm.startPrank(buyer);
        market.registerUser("Buyer", "Abuja");
        market.buyProduct{value: 1 ether}(1);
        vm.stopPrank();

        uint256 balance = address(escrow).balance;
        assertEq(balance, 1 ether);

        vm.prank(buyer);
        market.confirmReceived(1);

        assertEq(address(escrow).balance, 0);
    }

    function testReputationUpdate() public {
        vm.startPrank(seller);
        market.registerUser("Seller", "Jos");
        market.listProduct("Bag", "Leather Bag", 1 ether);
        vm.stopPrank();

        vm.startPrank(buyer);
        market.registerUser("Buyer", "Lagos");
        market.buyProduct{value: 1 ether}(1);
        market.confirmReceived(1);
        vm.stopPrank();

        (, , uint256 rep, ) = market.users(seller);
        assertEq(rep, 1);
    }
}
