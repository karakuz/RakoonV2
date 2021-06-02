const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const twofactor = require("node-2fa");
const Web3 = require("web3");
const Token = require("./Token.json");
const Product = require("../../models/item");
const Store = require("../../models/store");
const Order = require("../../models/orders");
const easyinvoice = require('easyinvoice');
const Cart = require("../../models/userCart");
// import logo from "../../../src/components/rakoon_logo/raccoon";
const nodemailer = require("nodemailer");
const db = require("../../config/database");

router.post("/payment/faucet", async (req, res) => {
    const sessionID = req.body.sessionID;
    const sessionuser = await jwt.verify(sessionID, 'shhhhh');
    const user = User.findOne({ where: { user_id: sessionuser.user_id } });
    const token = req.body.token;
    transfer(token, user.wallet_address);
});


router.post("/payment/walletaddress", async (req, res) => {
    const sessionID = req.body.sessionID;
    const sessionuser = await jwt.verify(sessionID, 'shhhhh');
    const user = await User.findOne({ where: { user_id: sessionuser.user_id } });
    res.send(user.wallet_address);
});

router.post("/payment/walletbalance", async (req, res) => {

    const sessionID = req.body.sessionID;
    const sessionuser = await jwt.verify(sessionID, 'shhhhh');
    const user = await User.findOne({ where: { user_id: sessionuser.user_id } });
    let balance = await balanceOf(user.wallet_address);
    const info = {
        address: user.wallet_address,
        balance: balance / 1000000000000000000
    }
    res.json(info);
});

router.post("/payment/transferFaucet", async (req, res) => {

    const sessionID = req.body.sessionID;
    const sessionuser = await jwt.verify(sessionID, 'shhhhh');
    const token = req.body.input;
    console.log(token);
    const user = await User.findOne({ where: { user_id: sessionuser.user_id } });
    await transferFaucet(token, user.wallet_address);

    res.send(true);
});

router.post("/payment/transfer", async (req, res) => {
  const sessionID = req.body.sessionID;
  const sessionuser = await jwt.verify(sessionID, 'shhhhh');
  const info = req.body.info;
  const products = req.body.products;

  var price = products.reduce((a, v) => a = a + v.price, 0);
  const user = await User.findOne({ where: { user_id: sessionuser.user_id } });
  let user_balance = await balanceOf(user.wallet_address);
  user_balance = user_balance / 1000000000000000000;
  if (user_balance < price) {
    res.send("InsufficientBalance");
  }
  else {
    for (let item of products) {
      const product = await Product.findOne({ where: { item_id: item.item_id } });
      const store = await Store.findOne({ where: { store_id: product.store_id } });
      const store_owner = await User.findOne({ where: { user_id: store.owner_id } });
      const today = new Date();
      const mm = (today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1);
      const dd = (today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate());
      const date = `${String(today.getFullYear())}-${mm}-${dd}`;

      await db.get(`
        INSERT INTO orders(date,address,customer_id,seller_id,item_id,price, status, quantity) 
        VALUES('${date}', 'test address', ${user.user_id}, ${store.store_id}, ${product.item_id}, ${product.price}, 'pending', 1)`);
      await transfer(price, user.wallet_address, user.wallet_private_key, store_owner.wallet_address)
        .then(() => {
            ;
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
      const cartProduct = await Cart.findOne({
        where: {
            user_id: user.user_id,
            item_id: product.item_id
        }
      });
      await cartProduct.destroy();
      await sendInvoice(product, user, info);
    }
    res.send("Success");
  }

});


const sendInvoice = async function (product, user, info) {
    var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        "currency": "USD",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://i.ibb.co/93SdLZt/raccoon.png", //or base64
        //"logoExtension": "png", //only when logo is base64
        "sender": {
            "company": "Rakoon E-Commerce Ltd Sti",
            "address": "Ozyegin University",
            "zip": "34794",
            "city": "Istanbul",
            "country": "Cekmekoy"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "client": {
            "company": user.name + " " + user.surname,
            "address": info.address,
            "zip": info.zip,
            "city": info.city,
            "country": info.country
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "invoiceNumber": "2020.0001",
        "invoiceDate": "05-01-2020",

        "products": [
            {
                "quantity": "1",
                "description": product.item_name,
                "tax": 6,
                "price": product.price
            },

        ],
        "bottomNotice": "Thank you for choose us"
    };

    easyinvoice.createInvoice(data, function (result) {

        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'rakoonecommerceservices@gmail.com',
                pass: "rakoon123"
            }
        });
        var mailOptions = {
            to: user.e_mail,
            from: 'rakoonecommerceservices@gmail.com',
            subject: 'Your Invoice',
            text: 'Hello,\n\n' +
                'You can find your invoice in the attachment \n',
            attachments: [{
                filename: 'Invoice.pdf',
                content: new Buffer(result.pdf, 'base64'),
                contentType: 'application/pdf'
            }]
        };
        smtpTransport.sendMail(mailOptions, function (err) {
            console.log("invoice mail has sent");
        });

    });

}




const deleteUserCart = async function (user) {

}





const transfer = async function (amount, user_wallet_address, user_private_key, store_wallet_address) {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    web3.eth.defaultAccount = user_wallet_address;
    await web3.eth.accounts.wallet.add(user_private_key);
    const contract = new web3.eth.Contract(Token.abi, '0x4114fc29c232a9e18a81af22423f3340d79cabb0', { from: user_wallet_address, gas: 100000 });
    await contract.methods.transfer(store_wallet_address, web3.utils.toWei(String(amount), 'ether')).send().then(console.log).catch(console.error);
}




const transferFaucet = async function (amount, user_wallet_address) {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    var admin_address = '0xeF9b4260259317A9094b6378B642cbD331a890cD';
    const privatekey = "0x90c50c5ef4ce5dfdcadeb15296d3e2f58924a2cabffd6437f47071506311231f";
    web3.eth.defaultAccount = admin_address;
    await web3.eth.accounts.wallet.add(privatekey);
    const contract = new web3.eth.Contract(Token.abi, '0x4114fc29c232a9e18a81af22423f3340d79cabb0', { from: admin_address, gas: 100000 });
    await contract.methods.transfer(user_wallet_address, web3.utils.toWei(amount, 'ether')).send().then(console.log).catch(console.error);
    const price = await contract.methods.balanceOf(user_wallet_address).call();
    console.log(price);
    /*
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    var admin_address = '0xeF9b4260259317A9094b6378B642cbD331a890cD';
    var myContract = new web3.eth.Contract(Token.abi, '0x4114fc29c232a9e18a81af22423f3340d79cabb0', {
        from: '0xeF9b4260259317A9094b6378B642cbD331a890cD', // default from address
        gasPrice: '2000' // default gas price in wei, 20 gwei in this case
    });
    const privatekey = "0x90c50c5ef4ce5dfdcadeb15296d3e2f58924a2cabffd6437f47071506311231f";

    console.log(1);
    web3.eth.defaultAccount = admin_address;
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
            gas: 2000,
            gasPrice,
            nonce
        },
        privatekey
    );

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    */

}

const balanceOf = async function (address) {
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    var myContract = new web3.eth.Contract(Token.abi, '0x4114fc29c232a9e18a81af22423f3340d79cabb0', {
        from: '0xeF9b4260259317A9094b6378B642cbD331a890cD', // default from address
        gasPrice: '2000' // default gas price in wei, 20 gwei in this case
    });
    const price = await myContract.methods.balanceOf(address).call();
    return price;
}

module.exports = router;