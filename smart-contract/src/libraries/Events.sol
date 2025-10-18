// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Events {
    // User registration
    event UserRegistered(address indexed user, string username, string fullName, string country);

    // Marketplace
    event ProductListed(uint256 indexed productId, address indexed seller, string name, uint256 price);
    event ProductPurchased(uint256 indexed productId, address indexed buyer, address seller, uint256 amount);

    // Escrow
    event DealCreated(uint256 indexed dealId, address buyer, address seller, uint256 amount);
    event DealReleased(uint256 indexed dealId, address buyer, address seller, uint256 amount);
    event DealDisputed(uint256 indexed dealId, address buyer, address seller);
    event DealResolved(uint256 indexed dealId, address winner);

    // Reputation
    event ReputationUpdated(address indexed user, uint256 newScore);
}
