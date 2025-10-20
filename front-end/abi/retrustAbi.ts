export const retrustAbi = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_escrow", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "buyProduct",
      "inputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "confirmReceived",
      "inputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "editProduct",
      "inputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" },
        { "name": "description", "type": "string", "internalType": "string" },
        { "name": "image", "type": "string", "internalType": "string" },
        { "name": "category", "type": "string", "internalType": "string" },
        { "name": "location", "type": "string", "internalType": "string" },
        {
          "name": "condition",
          "type": "uint8",
          "internalType": "enum ReTrust.Condition"
        },
        { "name": "price", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "escrow",
      "inputs": [],
      "outputs": [
        { "name": "", "type": "address", "internalType": "contract Escrow" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "listProduct",
      "inputs": [
        { "name": "name", "type": "string", "internalType": "string" },
        { "name": "description", "type": "string", "internalType": "string" },
        { "name": "image", "type": "string", "internalType": "string" },
        { "name": "category", "type": "string", "internalType": "string" },
        { "name": "location", "type": "string", "internalType": "string" },
        {
          "name": "condition",
          "type": "uint8",
          "internalType": "enum ReTrust.Condition"
        },
        { "name": "price", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "nextId",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "products",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" },
        {
          "name": "seller",
          "type": "address",
          "internalType": "address payable"
        },
        { "name": "name", "type": "string", "internalType": "string" },
        { "name": "description", "type": "string", "internalType": "string" },
        { "name": "image", "type": "string", "internalType": "string" },
        { "name": "category", "type": "string", "internalType": "string" },
        { "name": "location", "type": "string", "internalType": "string" },
        {
          "name": "condition",
          "type": "uint8",
          "internalType": "enum ReTrust.Condition"
        },
        { "name": "timestamp", "type": "uint256", "internalType": "uint256" },
        { "name": "reputation", "type": "uint256", "internalType": "uint256" },
        { "name": "price", "type": "uint256", "internalType": "uint256" },
        { "name": "sold", "type": "bool", "internalType": "bool" },
        { "name": "listed", "type": "bool", "internalType": "bool" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "registerUser",
      "inputs": [
        { "name": "fullName", "type": "string", "internalType": "string" },
        { "name": "username", "type": "string", "internalType": "string" },
        { "name": "email", "type": "string", "internalType": "string" },
        { "name": "location", "type": "string", "internalType": "string" },
        { "name": "country", "type": "string", "internalType": "string" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "reputation",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "requestRefund",
      "inputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unlistProduct",
      "inputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "users",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "fullName", "type": "string", "internalType": "string" },
        { "name": "username", "type": "string", "internalType": "string" },
        { "name": "email", "type": "string", "internalType": "string" },
        { "name": "location", "type": "string", "internalType": "string" },
        { "name": "country", "type": "string", "internalType": "string" },
        { "name": "registered", "type": "bool", "internalType": "bool" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "ProductDelivered",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProductEdited",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProductListed",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "seller",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "image",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "category",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "location",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "condition",
          "type": "uint8",
          "indexed": false,
          "internalType": "enum ReTrust.Condition"
        },
        {
          "name": "timestamp",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "reputation",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "price",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProductPurchased",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "buyer",
          "type": "address",
          "indexed": false,
          "internalType": "address"
        },
        {
          "name": "price",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProductRefunded",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ProductUnlisted",
      "inputs": [
        {
          "name": "id",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ReputationUpdated",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newScore",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserRegistered",
      "inputs": [
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "username",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "fullName",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "country",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "AlreadyRegistered", "inputs": [] },
    { "type": "error", "name": "InvalidAmount", "inputs": [] },
    { "type": "error", "name": "NotAuthorized", "inputs": [] },
    { "type": "error", "name": "NotBuyer", "inputs": [] },
    { "type": "error", "name": "NotLocked", "inputs": [] },
    { "type": "error", "name": "ProductAlreadySold", "inputs": [] },
    { "type": "error", "name": "ProductNotFound", "inputs": [] },
    { "type": "error", "name": "ProductNotListed", "inputs": [] },
    { "type": "error", "name": "UsernameTaken", "inputs": [] }
  ]
