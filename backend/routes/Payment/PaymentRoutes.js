const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const twofactor = require("node-2fa");
const Web3 = require("web3");
const Token = require("./Token.json");

router.post("/payment/faucet", async (req, res) => {
    const sessionID = req.body.sessionID;
    const sessionuser = await jwt.verify(sessionID, 'shhhhh');
    const user = User.findOne({ where: { user_id: sessionuser.user_id } });
    const token = req.body.token;
    transfer(token, user.wallet_address);
});


router.post("/payment/walletbalance", async (req, res) => {
    console.log("asda");
    const sessionID = req.body.sessionID;
    const sessionuser = await jwt.verify(sessionID, 'shhhhh');
    const user = await User.findOne({ where: { user_id: sessionuser.user_id } });
    transfer(1, user.wallet_address);
    /*
    const balance = await balanceOf(user.wallet_address);
    const info = {
        "wallet_address": user.wallet_address,
        "balance": balance
    
    }
    */
})



const transfer = async function (amount, user_wallet_address) {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    var admin_address = '0xeF9b4260259317A9094b6378B642cbD331a890cD';
    var myContract = await new web3.eth.Contract(Token.abi, '0x4114fc29c232a9e18a81af22423f3340d79cabb0');
    const privatekey = "0x90c50c5ef4ce5dfdcadeb15296d3e2f58924a2cabffd6437f47071506311231f";

    console.log(1);
    await web3.eth.accounts.wallet.add(privatekey);
    const gas = await web3.eth.estimateGas({ from: '0xeF9b4260259317A9094b6378B642cbD331a890cD', to: user_wallet_address }) + 4000;
    console.log(gas);
    const gasPrice = await web3.eth.getGasPrice();
    console.log(gasPrice);
    const tx = await myContract.methods.transfer(user_wallet_address, amount).send({ from: admin_address, gasPrice: gasPrice, gas: gas });



    const data = myContract.methods.transfer(user_wallet_address, amount).encodeABI();
    const nonce = await web3.eth.getTransactionCount('0xeF9b4260259317A9094b6378B642cbD331a890cD');
    console.log("qweqwe");
    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: user_wallet_address,
            data,
            gas: 2000000,
            gasPrice,
            nonce
        },
        privatekey
    );

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

}

const balanceOf = async function (address) {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    var myContract = new web3.eth.Contract(Token.abi, '0x4114fc29c232a9e18a81af22423f3340d79cabb0', {
        from: '0x6A42544685C10110818764f0C5e039F4985Be6b0', // default from address
        gasPrice: '20000000000000' // default gas price in wei, 20 gwei in this case
    });
    const price = await myContract.methods.balanceOf(address).call();
    return price;
}

module.exports = router;