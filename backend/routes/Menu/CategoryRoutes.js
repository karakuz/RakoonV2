const express = require("express");
const router = express.Router();
const db = require('../../config/database.js');
const Product = require("../../models/item");


// Get all category names from db
router.get("/categories", async (req, res) => {
    var categories = await Product.findAll({
        attributes: ["category"],
        group: "category"
    });
    console.log(categories);
    res.send(categories);
});

router.get("/category/:name", async (req, res) => {
    let products = await Product.findAll({ where: { category: req.params.name } });
    if (products.length === 0) res.send("none");
    else {
        res.send(products);
    }
})

module.exports = router;