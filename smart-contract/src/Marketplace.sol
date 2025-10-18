// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Escrow} from "./Escrow.sol";
import {Errors} from "./libraries/Errors.sol";

contract Marketplace {
    Escrow public escrow;

    constructor(address payable _escrow) {
        escrow = Escrow(_escrow);
    }

    struct Product {
        uint256 id;
        address payable seller;
        string name;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductListed(uint256 id, string name, uint256 price);
    event ProductSold(uint256 id, address buyer, uint256 price);

    function listProduct(string memory name, uint256 price) external {
        if (price == 0) revert Errors.InvalidAmount();

        productCount++;
        products[productCount] = Product(productCount, payable(msg.sender), name, price, false);
        emit ProductListed(productCount, name, price);
    }

    function buyProduct(uint256 id) external payable {
        Product storage product = products[id];
        if (product.sold) revert Errors.AlreadySold();
        if (msg.value != product.price) revert Errors.InvalidAmount();

        product.sold = true;
        escrow.lockFunds{value: msg.value}(product.seller, msg.sender, id);
        emit ProductSold(id, msg.sender, msg.value);
    }
}
