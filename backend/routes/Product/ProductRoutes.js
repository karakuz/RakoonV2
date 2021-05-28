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
  let all_products = await db.get(`
  SELECT 
	  items.*,
    store.store_name,
    campaign_items.old_price, 
    0 as rate FROM items
  LEFT JOIN store 
  ON store.store_id = items.store_id 
  LEFT JOIN campaign_items 
  ON campaign_items.item_id = items.item_id
  ORDER BY item_id;
  `);

  let map = new Map();
  for(let product of all_products)
    map.set(product.item_id, {...product});
  
  const rated_products = await db.get(`
    SELECT item_id, store.store_name, item_name, price, image, AVG(rate) as rate FROM 
      (SELECT 
        items.*,
        rate,
        is_verified
      FROM rakoon.items RIGHT JOIN ratings ON items.item_id=ratings.item_id
      ) AS J
      JOIN store ON store.store_id = J.store_id WHERE is_verified = 1
    `);
  
  for(let product of rated_products)
    map.set(product.item_id, {...product, old_price: map.get(product.item_id).old_price});
  
  res.send(Array.from(map.values()));
})

router.get("/getRecommendation/:id", async (req, res) => {
  
  var product = await Product.findOne({ where: { item_id: req.params.id } });
  console.log(product);
  let similar_products = await db.get(`SELECT * FROM items WHERE items.category = '${product.category}' ORDER BY RAND() LIMIT 4`);
  let map = new Map();
  console.log(similar_products);
  for(let product of similar_products)
    map.set(product.item_id, {...product});

  res.send(Array.from(map.values()));
})

/*
router.get("/getRecommendation/:id", async (req, res) => {
  const id = req.params.keyword;
    var product = await Product.findAll({
        where: {
            [Op.or]: {
                item_name: {
                    [Op.substring]: keyword
                },
            }
        }
    });
    if (product === null || product === undefined) {
        res.sendStatus(404);
    }

    else {
        res.send(product);
    }
})*/

router.post("/addComment", async (req, res) => {
  const data = req.body.data;

  await db.get(`INSERT INTO ratings(item_id,store_id,user_id,comment,rate,is_verified,date) VALUES(
    ${data.productID}, (
        SELECT store_id FROM rakoon.items WHERE item_id=${data.productID}
    ),${data.user_id}, '${data.comment}', ${data.rate}, ${0}, '${data.date}'
  )`);
  res.send("done");
})

module.exports = router;