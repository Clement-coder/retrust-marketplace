// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IArbitrator {
    function resolveDispute(uint256 escrowId, bool buyerWins) external;
}
