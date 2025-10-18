// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./libraries/Errors.sol";
import "./Escrow.sol";

contract ReTrust {
    using Errors for *;

    struct Product {
        uint256 id;
        address payable seller;
        string name;
        string description;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => Product) public products;
    uint256 public nextId;
    Escrow public escrow;

    event ProductListed(uint256 id, address seller, uint256 price);
    event ProductPurchased(uint256 id, address buyer, uint256 price);
    event ProductDelivered(uint256 id);
    event ProductRefunded(uint256 id);

    constructor(address _escrow) {
        escrow = Escrow(_escrow);
    }

    function listProduct(string memory name, string memory description, uint256 price) external {
        if (price == 0) revert Errors.InvalidAmount();

        uint256 productId = ++nextId;
        products[productId] = Product({
            id: productId,
            seller: payable(msg.sender),
            name: name,
            description: description,
            price: price,
            sold: false
        });

        emit ProductListed(productId, msg.sender, price);
    }

    function buyProduct(uint256 id) external payable {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (product.sold) revert Errors.ProductAlreadySold();
        if (msg.value != product.price) revert Errors.InvalidAmount();

        product.sold = true;

        escrow.deposit{value: msg.value}(id, product.seller);

        emit ProductPurchased(id, msg.sender, msg.value);
    }

    function confirmDelivery(uint256 id) external {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (!product.sold) revert Errors.NotLocked();

        escrow.release(id);
        emit ProductDelivered(id);
    }

    function requestRefund(uint256 id) external {
        Product storage product = products[id];
        if (product.seller == address(0)) revert Errors.ProductNotFound();
        if (!product.sold) revert Errors.NotLocked();

        escrow.refund(id);
        emit ProductRefunded(id);
    }
}
