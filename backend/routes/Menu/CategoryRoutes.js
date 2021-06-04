const express = require("express");
const router = express.Router();
const db = require('../../config/database.js');
const Product = require("../../models/item");

// Get all category names from db
router.get("/categories", async (req, res) => {
    console.log("test");
    var categories = await Product.findAll({
        attributes: ["category"],
        group: "category"
    });
    res.send(categories);
});

router.get("/category/:name", async (req, res) => {

  let all_category_products = await db.get(`
  SELECT 
	  items.*,
    store.store_name,
    campaign_items.old_price, 
    0 as rate FROM items
  LEFT JOIN store 
  ON store.store_id = items.store_id 
  LEFT JOIN campaign_items 
  ON campaign_items.item_id = items.item_id
  WHERE category = '${req.params.name}'
  ORDER BY item_id;
  `);

  let map = new Map();
  for(let product of all_category_products)
    map.set(product.item_id, {...product});
  
  const rated_products = await db.get(`
    SELECT item_id, store.store_name, item_name, price, image, AVG(rate) as rate FROM 
      (SELECT 
        items.*,
        rate,
        is_verified
      FROM rakoon.items 
      RIGHT JOIN ratings 
      ON items.item_id=ratings.item_id
      ) AS J
      JOIN store ON store.store_id = J.store_id
      WHERE is_verified = 1 AND category = '${req.params.name}'
    `);
  
  for(let product of rated_products)
    map.set(product.item_id, {...product, old_price: map.get(product.item_id).old_price});
  

  
  res.send(Array.from(map.values()));
  
})

module.exports = router;