const express = require("express");
const router = express.Router();
const Product = require("../../models/item");
const db = require("../../config/database");

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
    var products = await db.get(`
      SELECT item_id, item_name, price, description, image, category, store_id, countInStock, brand, rate
        FROM rakoon.items JOIN ratings ON ratings.rating_id=items.rating_id;`);
    for(let product of products){
      console.log(product);
    }

    res.send(products);
})

module.exports = router;