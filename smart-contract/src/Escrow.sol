// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./libraries/Errors.sol";

contract Escrow {
    using Errors for *;

    address public marketplace;
    mapping(uint256 => EscrowInfo) public escrows;

    struct EscrowInfo {
        address buyer;
        address seller;
        uint256 amount;
        bool locked;
        bool released;
    }

    modifier onlyMarketplace() {
        if (msg.sender != marketplace) revert Errors.NotMarketplace();
        _;
    }

    function setMarketplace(address _marketplace) external {
        if (marketplace != address(0)) revert Errors.AlreadyLocked();
        marketplace = _marketplace;
    }

    function lockFunds(address seller, address buyer, uint256 productId) external payable onlyMarketplace {
        if (msg.value == 0) revert Errors.InvalidAmount();
        EscrowInfo storage e = escrows[productId];
        if (e.locked) revert Errors.AlreadyLocked();

        e.buyer = buyer;
        e.seller = seller;
        e.amount = msg.value;
        e.locked = true;
    }

    function release(uint256 productId) external onlyMarketplace {
        EscrowInfo storage e = escrows[productId];
        if (!e.locked || e.released) revert Errors.NotLocked();

        e.released = true;
        e.locked = false;

        (bool success, ) = e.seller.call{value: e.amount}("");
        if (!success) revert Errors.TransferFailed();
    }

    function refund(uint256 productId) external onlyMarketplace {
        EscrowInfo storage e = escrows[productId];
        if (!e.locked || e.released) revert Errors.NotLocked();

        e.released = true;
        e.locked = false;

        (bool success, ) = e.buyer.call{value: e.amount}("");
        if (!success) revert Errors.TransferFailed();
    }

    function getBuyer(uint256 productId) external view returns (address) {
        return escrows[productId].buyer;
    }
}
