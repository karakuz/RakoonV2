const express = require("express");
const router = express.Router();
const Product = require("../../models/item");
const UserCart = require("../../models/userCart");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

router.post("/cart/product/:id", async (req, res) => {
    const productId = req.params.id;
    const sessionID = req.body.user;
    const user = jwt.verify(sessionID, 'shhhhh');

    const CartProduct = await UserCart.create({
        item_id: productId,
        user_id: user.user_id
    });
});

router.delete("/cart/product/:id", async (req, res) => {
    const productId = req.params.id;
    const sessionID = req.body.user;
    const user = jwt.verify(sessionID, 'shhhhh');
    const CartProduct = await UserCart.destroy({
        where: {
            item_id: productId,
            user_id: user.user_id
        }
    });
    res.send(true);
});

router.post("/cart/products", async (req, res) => {
    const sessionID = req.body.sessionID;
    const user = jwt.verify(sessionID, 'shhhhh');
    const productIDs = await UserCart.findAll({
        attributes: ["item_id"],
        where: {
            user_id: user.user_id
        }
    });

    let products = await getProducts(productIDs);
    if (products.length !== 0) res.send(products);
    else res.send("none");

});


const getProducts = async function (itemIDs) {
    let products = [];
    for (const itemID of itemIDs) {
        const product = await Product.findAll({ where: { item_id: itemID.item_id } });
        products.push(product[0]);
    }
    return products;
}




module.exports = router;