const express = require("express");
const router = express.Router();
const Product = require("../../models/item");


router.get("/product/:id", async (req, res) => {
    var product = await Product.findOne({ where: { item_id: req.params.id } });
    if (product === null || product === undefined) {
        res.sendStatus(404);
    }

    else {
        res.send(product.toJSON());
    }


});

router.get("/products", async (req, res) => {
    var products = await Product.findAll();

    res.send(products);
})

module.exports = router;