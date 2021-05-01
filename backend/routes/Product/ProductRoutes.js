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

router.get("/product/:id", async (req, res) => {
  const productID = req.params.id;
  
  const comments = await db.get(`SELECT comment, rate FROM ratings WHERE rating(SELECT rating_id, rate FROM items WHERE item_id=${productID})`);
});

router.get("/products", async (req, res) => {
    /* var products = await db.get(`
      SELECT item_id, item_name, price, description, image, category, store_id, countInStock, brand, rate
        FROM rakoon.items JOIN ratings ON items.item_id=ratings.item_id;`); */
    var products = await db.get(`
      SELECT * FROM rakoon.items`);
    
    res.send(products);
})

module.exports = router;