// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./libraries/Errors.sol";
import "./libraries/Events.sol";
import "./Escrow.sol";

contract ReTrust {
    using Errors for *;

    enum Condition {
        New,
        Used,
        Refurbished
    }

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

    struct Product {
        uint256 id;
        address payable seller;
        string name;
        string description;
        string image;
        string category;
        string location;
        Condition condition;
        uint256 timestamp;
        uint256 reputation;
        uint256 price;
        bool sold;
        bool listed;
    }

    mapping(uint256 => Product) public products;
    uint256 public nextId;
    Escrow public escrow;

    mapping(address => uint256) public reputation;

    event ProductListed(uint256 id, address seller, string image, string category, string location, Condition condition, uint256 timestamp, uint256 reputation, uint256 price);
    event ProductPurchased(uint256 id, address buyer, uint256 price);
    event ProductDelivered(uint256 id);
    event ProductRefunded(uint256 id);
    event ProductUnlisted(uint256 id);
    event ProductEdited(uint256 id);

    constructor(address _escrow) {
        escrow = Escrow(_escrow);
    }

    function registerUser(
        string memory fullName,
        string memory username,
        string memory email,
        string memory location,
        string memory country
    ) external {
        if (users[msg.sender].registered) revert Errors.AlreadyRegistered();
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

    function listProduct(
        string memory name,
        string memory description,
        string memory image,
        string memory category,
        string memory location,
        Condition condition,
        uint256 price
    ) external {
        if (price == 0) revert Errors.InvalidAmount();

        uint256 productId = ++nextId;
        products[productId] = Product({
            id: productId,
            seller: payable(msg.sender),
            name: name,
            description: description,
            image: image,
            category: category,
            location: location,
            condition: condition,
            timestamp: block.timestamp,
            reputation: reputation[msg.sender],
            price: price,
            sold: false,
            listed: true
        });

        emit ProductListed(productId, msg.sender, image, category, location, condition, block.timestamp, reputation[msg.sender], price);
    }

    function buyProduct(uint256 id) external payable {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (product.sold) revert Errors.ProductAlreadySold();
        if (msg.value != product.price) revert Errors.InvalidAmount();

        product.sold = true;

        escrow.lockFunds{value: msg.value}(product.seller, msg.sender, id);

        emit ProductPurchased(id, msg.sender, msg.value);
    }

    function confirmReceived(uint256 id) external {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (!product.sold) revert Errors.NotLocked();

        address buyer = escrow.getBuyer(id);
        if (msg.sender != buyer) revert Errors.NotBuyer();

        escrow.release(id);
        increaseReputation(product.seller);
        emit ProductDelivered(id);
    }

    function increaseReputation(address user) internal {
        reputation[user] += 1;
        emit Events.ReputationUpdated(user, reputation[user]);
    }

    function requestRefund(uint256 id) external {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (!product.sold) revert Errors.NotLocked();

        escrow.refund(id);
        emit ProductRefunded(id);
    }

    function unlistProduct(uint256 id) external {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (product.seller != msg.sender) revert Errors.NotAuthorized();
        if (product.sold) revert Errors.ProductAlreadySold();
        if (!product.listed) revert Errors.ProductNotListed();

        product.listed = false;
        emit ProductUnlisted(id);
    }

    function editProduct(
        uint256 id,
        string memory description,
        string memory image,
        string memory category,
        string memory location,
        Condition condition,
        uint256 price
    ) external {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (product.seller != msg.sender) revert Errors.NotAuthorized();
        if (product.sold) revert Errors.ProductAlreadySold();
        if (!product.listed) revert Errors.ProductNotListed();
        if (price == 0) revert Errors.InvalidAmount();

        product.description = description;
        product.image = image;
        product.category = category;
        product.location = location;
        product.condition = condition;
        product.price = price;

        emit ProductEdited(id);
    }
}