// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./libraries/Errors.sol";
import "./libraries/Events.sol";

contract ReTrustID {
    struct User {
        string fullName;
        string username;
        string email;
        string location;
        string country;
        bool registered;
    }

    mapping(address => User) public users;
    mapping(string => bool) private usernameTaken;

    function registerUser(
        string memory fullName,
        string memory username,
        string memory email,
        string memory location,
        string memory country
    ) external {
        if (users[msg.sender].registered) revert Errors.InvalidInput();
        if (usernameTaken[username]) revert Errors.UsernameTaken();

        users[msg.sender] = User({
            fullName: fullName,
            username: username,
            email: email,
            location: location,
            country: country,
            registered: true
        });

        usernameTaken[username] = true;

        emit Events.UserRegistered(msg.sender, username, fullName, country);
    }

    function isRegistered(address user) external view returns (bool) {
        return users[user].registered;
    }
}
