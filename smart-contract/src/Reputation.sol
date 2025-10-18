// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./libraries/Events.sol";
import "./libraries/Errors.sol";

contract Reputation {
    mapping(address => uint256) public reputation;

    function increaseReputation(address user) external {
        reputation[user] += 1;
        emit Events.ReputationUpdated(user, reputation[user]);
    }

    function getReputation(address user) external view returns (uint256) {
        return reputation[user];
    }
}
