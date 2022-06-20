const express = require("express");
const http = require('http');
const Web3 =  require("web3")
const app = express(); 
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
var wss = "wss://cool-wispy-feather.ropsten.quiknode.pro/e9f0b6b76ce4bdfedb224edd8279642111a45317/"; 
const web3 = new Web3(wss);
const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"_username","type":"string"},{"indexed":true,"internalType":"uint256","name":"UserID","type":"uint256"},{"indexed":true,"internalType":"address","name":"UserAddress","type":"address"}],"name":"AccountCreated","type":"event"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"address","name":"_sender","type":"address"}],"name":"addFriend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_usernames","type":"string"},{"internalType":"address","name":"newUser","type":"address"}],"name":"createAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"delChatActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountInfo","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"getActiveChat","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllUsers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"friend","type":"address"},{"internalType":"address","name":"friend2","type":"address"}],"name":"getChatCode","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"}],"name":"getFriends","outputs":[{"components":[{"internalType":"address","name":"friend","type":"address"}],"internalType":"struct Messenger.friends[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"friend_key","type":"bytes32"}],"name":"readMessage","outputs":[{"components":[{"internalType":"address","name":"reciever","type":"address"},{"internalType":"string","name":"_message","type":"string"}],"internalType":"struct Messenger.message[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"string","name":"_msg","type":"string"}],"name":"sendMessage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"setChatActive","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var contractAddress = "0x145b48cF16EF3A150322D0da0452f73FE4A50492"; 
var myContract = new web3.eth.Contract(abi, contractAddress);
const networkId = web3.eth.net.getId();
const secretKey = "8b299edbf9bffbc1833facc6a598d685ff485911e167d9bcb6e769e6db5a02c8" 
const secretKeyTwo = "697fdb9b635d6e4175b6041bea825031fd695bebb4f38ee2d30233230d278783"
const address = "0x7831E194F6DF6f55f1aE56e6EDcbEE64E9e9F720"
const addressTwo = "0x04b4dbA9D2F34F007F55e350BCFf0DB318003a68"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app); 

server.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}`)
});

app.get('/api/allUser', (_req, res) => {
    res.send('hello')
})

app.post('/api/allUsers', async (_req, res) => {
    let allUsers;
    await myContract.methods.getAllUsers().call((_err, response) => {
        allUsers = response
    })
    res.send({allUsers : allUsers});
});

app.post('/api/userInfo', async (req, res) => {
    let sender = req.body.sender;
    if (sender=== undefined) { return console.log('invalid sender@userinfo') }
    else if (sender === '') { return console.log('invalid sender@userInfo') }
    try {
        let userInfo;
        await myContract.methods.getAccountInfo(sender).call((_err, response) => {
            userInfo = response
        })
        res.send({ userInfo: userInfo })
    } catch (err) {
        res.send(err);
    }
})

app.post('/api/friendCode', async (req, res) => {
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let friendCode;
    if (sender=== undefined) { return console.log('invalid sender@friendCode') }
    else if (sender === '') { return console.log('invalid sender@friendCode') }
    if (receiver=== undefined) { return console.log('invalid receiver@friendCode') }
    else if (receiver=== '') { return console.log('invalid receiver@friendCode') }
    try {

        await myContract.methods.getChatCode(sender, receiver).call((req, res) => {
            friendCode = res;
        })

        res.send({ friendCode: friendCode });
    }
    catch (err) { console.log(err) }
});
 
app.post('/api/friendList', async (req, res) => {
    let sender = req.body.sender 
    let friends;
    if (sender === undefined) { console.log('invalid senderAddress@/friendList',) } 
    else if (sender === '') { console.log('invalid senderAddress@/friendList',) }
    else {
        try { await myContract.methods.getFriends(sender).call((req, res) => {
            friends = res;
            })
            res.send({ friendList: friends })
        } catch (err) {
            res.send(err)
            console.log(err)
        }
    };
})

app.post('/api/getMessages', async (req, res) => {
    let friendCode = req.body.friendCode
    let receivedMessages;
    console.log(friendCode)
    if (req.body.friendCode === undefined) { return console.log('invalid friendCode@MessageHistory') }
    else if (req.body.friendCode === '') { return console.log('invalid friendCode@MessageHistory') }
    else {
        try {
            await myContract.methods.readMessage(friendCode.friendCode).call((err, res) => {
                receivedMessages = res;
            })
            res.send({ receivedMessages: receivedMessages });
        } catch (err) {
            console.log('error @ getMessages',err)
        }
    }
}); 

app.post('/api/activeChat', async (req, res) => {
    let sender = req.body.sender;
    let activeChat; 
    if (sender=== undefined) { return console.log('invalid sender@activeChat') }
    else if (sender === '') { return console.log('invalid sender@activeChat') }
    try {
        await myContract.methods.getActiveChat(sender).call((_err, response) => {
            console.log('activeChat: ',response)
            activeChat = response;
        })
            res.send({ activeChat: activeChat })
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/api/createAccount', (_req, res) => {
    res.send('hello world')
})

app.post('/api/createAccount', async (req, res) => {

    const createAccount = async () => {
        try {
            // console.log('creating account', req.body)
            const tx = myContract.methods.createAccount(req.body.username, req.body.sender);
            let gas = await tx.estimateGas({ from: address });
            let gasPrice = await web3.eth.getGasPrice();
            let data = tx.encodeABI();
            let nonce = await web3.eth.getTransactionCount(address)

            let signedTx = await web3.eth.accounts.signTransaction({
                to: contractAddress,
                data: data,
                gas: gas,
                gasPrice: gasPrice,
                nonce: nonce,
                chainId: networkId,
            }, secretKey,
            )
            let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
            console.log(`transaction hash: ${receipt.transactionHash}`)
            res.send({ txnHash: `transaction hash: ${receipt.transactionHash}` })
        }
        catch (err) {
            let _err;
            if (err.data === null) {
                _err = 'no gas';
            }
            else if (err.data === '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001b5573657220697320616c72656164792072656769737465726564210000000000') {
                _err ='account exists';
            }
            res.send(_err);
            console.log(_err)
        }
    };
    createAccount()
})
 
app.post('/api/addFriend', async (req, res) => {
    try {
        let receiver = req.body.receiver;
        let sender = req.body.sender;
        const tx = myContract.methods.addFriend(receiver, sender);
        let gas = await tx.estimateGas({ from: address});
        let gasPrice = await web3.eth.getGasPrice();
        let data = tx.encodeABI();
        let nonce = await web3.eth.getTransactionCount(address)
        
        let signedTx = await web3.eth.accounts.signTransaction({
            to: contractAddress,
            data: data,
            gas: gas,
            gasPrice: gasPrice,
            nonce: nonce,
            chainId: networkId,
        }, secretKey,
        )
        let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        console.log(`transaction hash: ${receipt.transactionHash}`)
        res.send({ txnHash: `transaction hash: ${receipt.transactionHash}` });
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
});

app.post('/api/setActive', async (req, res) => {
    try {
        let tx = myContract.methods.setChatActive(req.body.sender, req.body.receiver);
        let gas = await tx.estimateGas({ from: addressTwo });
        let gasPrice = await web3.eth.getGasPrice();
        let data = tx.encodeABI();
        let nonce = await web3.eth.getTransactionCount(addressTwo)

        let signedTx = await web3.eth.accounts.signTransaction({
            to: contractAddress,
            data: data, 
            gas: gas,
            gasPrice: gasPrice,
            nonce: nonce,
            chainId: networkId,
        }, secretKeyTwo,
        )
        let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        console.log(`transaction hash: ${receipt.transactionHash}`)
        res.send({ txnHash: `transaction hash: ${receipt.transactionHash}` })
    }
    catch (err) {
        console.log('failed to set active: ', err)
        res.send(err)
    }
});

setTimeout(() => {
    app.post('/api/sendMessage', async (req, res) => {
        let sender = req.body.sender
        let receiver = req.body.receiver
        let message = req.body.message
        if (sender === undefined) { console.log('invalid senderAddress@/sendMessage') }
        else if (sender === '') { console.log('invalid senderAddress@/sendMessage') }
        else if (receiver === undefined) { console.log('invalid receiverAddress@/sendMessage') }
        else if (receiver === '') { console.log('invalid receiverAddress@/sendMessage') }
        else if (message === undefined) { console.log('invalid message@/sendMessage') }
        else if (message === '') { console.log('invalid message@/sendMessage') }
        else {
            try {
                let tx = myContract.methods.sendMessage(sender, receiver, message)
                let gas = await tx.estimateGas({ from: addressTwo });
                let gasPrice = await web3.eth.getGasPrice();
                let data = tx.encodeABI();
                let nonce = await web3.eth.getTransactionCount(addressTwo)

                let signedTx = await web3.eth.accounts.signTransaction({
                    to: contractAddress,
                    data: data,
                    gas: gas,
                    gasPrice: gasPrice,
                    nonce: nonce,
                    chainId: networkId,
                }, secretKeyTwo,
                )
                let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                console.log(`transaction hash: ${receipt.transactionHash}`)
                res.send({ txnHash: `transaction hash: ${receipt.transactionHash}` })
            }
            catch (err) {
                console.log(err)
                try {
                    let tx = myContract.methods.sendMessage(sender, receiver, message)
                    let gas = await tx.estimateGas({ from: address });
                    let gasPrice = await web3.eth.getGasPrice();
                    let data = tx.encodeABI();
                    let nonce = await web3.eth.getTransactionCount(address)
    
                    let signedTx = await web3.eth.accounts.signTransaction({
                        to: contractAddress,
                        data: data,
                        gas: gas,
                        gasPrice: gasPrice,
                        nonce: nonce,
                        chainId: networkId,
                    }, secretKey,
                    )
                    let receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    console.log(`transaction hash: ${receipt.transactionHash}`)
                    res.send({ txnHash: `transaction hash: ${receipt.transactionHash}` })
                }
                catch (err) { console.log(err); res.send(err) }
            }
        };
    })
}, 5000);