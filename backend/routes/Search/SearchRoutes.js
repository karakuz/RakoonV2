const express = require("express");
const router = express.Router();
const Product = require("../../models/item");
const { Op } = require("sequelize");


router.post("/search/:keyword", async (req, res) => {
    const keyword = req.params.keyword;
    var product = await Product.findAll({
        where: {
            [Op.or]: {
                item_name: {
                    [Op.substring]: keyword
                },
                description: {
                    [Op.substring]: keyword
                },
                brand: {
                    [Op.substring]: keyword
                }
            }
        }
    });
    if (product === null || product === undefined) {
        res.sendStatus(404);
    }

    else {
        res.send(product);
    }


});

module.exports = router;