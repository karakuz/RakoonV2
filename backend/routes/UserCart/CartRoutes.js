const express = require("express");
const router = express.Router();
const Product = require("../../models/item");
const UserCart = require("../../models/userCart");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

router.post("/product/:id", async (req, res) => {
    const productId = req.params.id;
    const sessionID = req.body.user;
    const user = jwt.verify(sessionID, 'shhhhh');
    const CartProduct = UserCart.create({
        item_id: productId,
        user_id: user.user_id
    });
})


module.exports = router;