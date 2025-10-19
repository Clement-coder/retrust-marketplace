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
        market.registerUser("Clem Mangu", "Clem", "clem@mangu.com", "Mangu", "Nigeria");

        (string memory fullName, string memory username, string memory email, string memory location, string memory country, bool registered) = market.users(seller);
        assertEq(fullName, "Clem Mangu");
        assertEq(username, "Clem");
        assertEq(email, "clem@mangu.com");
        assertEq(location, "Mangu");
        assertEq(country, "Nigeria");
        assertEq(registered, true);
    }

    function testProductListing() public {
        vm.startPrank(seller);
        market.registerUser("Clem Mangu", "Clem", "clem@mangu.com", "Mangu", "Nigeria");
        market.listProduct("Laptop", "Used HP EliteBook", "ipfs://QmVg...", "Electronics", "Lagos, Nigeria", ReTrust.Condition.Used, 1 ether);
        vm.stopPrank();

        (uint256 id_, address seller_, string memory name, string memory description, string memory image, string memory category, string memory location, ReTrust.Condition condition, uint256 timestamp, uint256 reputation, uint256 price, bool sold, bool listed) = market.products(1);
        assertEq(seller_, seller);
        assertEq(name, "Laptop");
        assertEq(description, "Used HP EliteBook");
        assertEq(image, "ipfs://QmVg...");
        assertEq(category, "Electronics");
        assertEq(location, "Lagos, Nigeria");
        assertEq(uint8(condition), uint8(ReTrust.Condition.Used));
        assertTrue(timestamp > 0);
        assertEq(reputation, 0);
        assertEq(price, 1 ether);
        assertEq(sold, false);
    }

    function testEscrowFlow() public {
        vm.startPrank(seller);
        market.registerUser("Seller Jos", "Seller", "seller@jos.com", "Jos", "Nigeria");
        market.listProduct("Phone", "Used iPhone 13", "ipfs://QmVg...", "Electronics", "Abuja, Nigeria", ReTrust.Condition.Used, 1 ether);
        vm.stopPrank();

        vm.deal(buyer, 2 ether);
        vm.startPrank(buyer);
        market.registerUser("Buyer Abuja", "Buyer", "buyer@abuja.com", "Abuja", "Nigeria");
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
        market.registerUser("Seller Jos", "Seller", "seller@jos.com", "Jos", "Nigeria");
        market.listProduct("Bag", "Leather Bag", "ipfs://QmVg...", "Fashion", "Lagos, Nigeria", ReTrust.Condition.New, 1 ether);
        vm.stopPrank();

        vm.deal(buyer, 2 ether);
        vm.startPrank(buyer);
        market.registerUser("Buyer Lagos", "Buyer", "buyer@lagos.com", "Lagos", "Nigeria");
        market.buyProduct{value: 1 ether}(1);
        market.confirmReceived(1);
        vm.stopPrank();

        uint256 rep = market.reputation(seller);
        assertEq(rep, 1);
    }

    function testUnlistProduct() public {
        vm.startPrank(seller);
        market.registerUser("Seller Jos", "Seller", "seller@jos.com", "Jos", "Nigeria");
        market.listProduct("Bag", "Leather Bag", "ipfs://QmVg...", "Fashion", "Lagos, Nigeria", ReTrust.Condition.New, 1 ether);
        vm.stopPrank();

        // Unlist product as seller
        vm.prank(seller);
        market.unlistProduct(1);
        (, , , , , , , , , , , bool sold, bool listed) = market.products(1);
        assertEq(listed, false);

        // Try to unlist again (should revert)
        vm.prank(seller);
        vm.expectRevert(Errors.ProductNotListed.selector);
        market.unlistProduct(1);

        // Try to unlist as non-seller (should revert)
        vm.prank(buyer);
        vm.expectRevert(Errors.NotAuthorized.selector);
        market.unlistProduct(1);
    }

    function testEditProduct() public {
        vm.startPrank(seller);
        market.registerUser("Seller Jos", "Seller", "seller@jos.com", "Jos", "Nigeria");
        market.listProduct("Bag", "Leather Bag", "ipfs://QmVg...", "Fashion", "Lagos, Nigeria", ReTrust.Condition.New, 1 ether);
        vm.stopPrank();

        // Edit product as seller
        vm.prank(seller);
        market.editProduct(1, "New Description", "ipfs://new_image...", "Books", "Abuja, Nigeria", ReTrust.Condition.Used, 2 ether);

        (, , string memory name, string memory description, string memory image, string memory category, string memory location, ReTrust.Condition condition, uint256 timestamp, uint256 reputation, uint256 price, bool sold, bool listed) = market.products(1);
        assertEq(description, "New Description");
        assertEq(image, "ipfs://new_image...");
        assertEq(category, "Books");
        assertEq(location, "Abuja, Nigeria");
        assertEq(uint8(condition), uint8(ReTrust.Condition.Used));
        assertEq(price, 2 ether);

        // Try to edit as non-seller (should revert)
        vm.prank(buyer);
        vm.expectRevert(Errors.NotAuthorized.selector);
        market.editProduct(1, "", "", "", "", ReTrust.Condition.New, 0);

        // Unlist the product
        vm.prank(seller);
        market.unlistProduct(1);

        // Try to edit unlisted product (should revert)
        vm.prank(seller);
        vm.expectRevert(Errors.ProductNotListed.selector);
        market.editProduct(1, "", "", "", "", ReTrust.Condition.New, 0);
    }
}
