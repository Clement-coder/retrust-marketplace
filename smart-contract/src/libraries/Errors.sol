// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Errors {
    // --- Generic ---
    error ZeroAddress();
    error NotAuthorized();

    // --- User Related ---
    error AlreadyRegistered();
    error NotRegistered();
    error InvalidUsername();
    error UsernameTaken();

    // --- Product Related ---
    error InvalidAmount();
    error InvalidPrice();
    error ProductSold();
    error AlreadySold();
    error IncorrectEthSent();

    // --- Escrow Related ---
    error AlreadyLocked();
    error AlreadyReleased();
    error NotBuyer();
    error NotSeller();
    error NotMarketplace();
    error TransferFailed();
    error NoEthSent();
}
