const express = require("express");
const router = express.Router();
/* const Product = require("../../models/item");
const { Op } = require("sequelize"); */
const db = require('../../config/database.js');

router.post("/search/:keyword", async (req, res) => {
  const keyword = req.params.keyword;

  let all_search_products = await db.get(`
    SELECT 
      items.*,
      store.store_name,
      campaign_items.old_price, 
      0 as rate FROM items
    LEFT JOIN store 
    ON store.store_id = items.store_id 
    LEFT JOIN campaign_items 
    ON campaign_items.item_id = items.item_id
    WHERE item_name LIKE '%${keyword}%'
    OR description LIKE '%${keyword}%'
    OR brand LIKE '%${keyword}%'
    ORDER BY item_id;
  `);

  let map = new Map();
  for(let product of all_search_products)
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
    WHERE is_verified = 1
  `);
  
  for(let product of rated_products)
    if(map.get(product.item_id) !== undefined)
      map.set(product.item_id, {...product, old_price: map.get(product.item_id).old_price});
  
  res.send(Array.from(map.values()));
});

module.exports = router;