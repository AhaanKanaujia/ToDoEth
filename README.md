# ToDoList

A simple blockchain based ToDo app powered by Ethereum Smart Contracts developed in Solidity, built using the Truffle Suite that can be deployed onto a Blockchain with migrations.

Utilized Truffle to compile the Smart Contracts on the Ethereum Virtual Machine (EVM) and Ganache as a private local blockchain to deploy the contracts and Web3 app.

Developed a frontend, Web3 app using Node.js, that interacts with the local Blockchain and the ToDo app. It allows users to create and complete tasks. The app interacts with MetaMask to validate the Smart Contracts and deploy the contract onto the chain itself.

Install Dependencies:

```
npm install
```

Run Developmental Server: 

```
npm run dev
```

The app is deployed to http://localhost:8000/, where you can add and complete tasks, interacting with the a local test blockchain network.
