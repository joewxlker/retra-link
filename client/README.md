# Welcome to my decentralised messaging app

If you would like to know how to create your own web3 messaging system please continue

## Requirements

### https://remix.ethereum.org/ 
This will be required to deploy the smart contract. 
 
you can find tutorials for deploying smart contracts on youtube

### https://www.quicknode.com/
You will need to register and purchase a blockchain node, I recommend any of ethereum's testnet's as they are the cheapest and you can receive free test eth to run your messenger with.
I have not tested this with any other node endpoints.

### https://metamask.io/

You will require atleast 2 wallets with more than 1 test eth each on them and you will also need the private keys

### dependencies
In your client directory you will need to install the following packages...
we can navigate to the client directory by typing


    cd client

    npm i react@v18.1.0
    npm i react-scripts@v18.1.0
    npm i react-router-dom@v18.1.0

In the Backend directory you will need to install the following packages

    cd backend

    npm i ethers@5.6.6
    npm i express@4.18.1
    npm i typescript@4.6.4
    npm i web3@v1.7.3

#### you may also need to install other packages such as nodemon if you havent installed these globally already
Now that we have the dependencies installed we can go ahead and start our react application and server

## React in terminal 1

    cd client

    npm start

## Express server in terminal 2

    cd backend

    npm start

Because we have configured our package.json to run nodemon we can use npm start to run nodemon on our server

    "scripts": {
    "start": "nodemon messageServer.ts",
    "watch": "tsc- w messageServer.ts", 
    "test": "echo \"Error: no test specified\" && exit 1"
    },

At this point in time you may realise that there is some errors in the server. This is most likely due to the fact that we havent connected our server to our ethereum node and smart contract. So before we move any further we must deploy our smart contract.







