const express = require("express");
const router = express.Router();
const db = require('./database');
const jwt = require('jsonwebtoken');

router.post('/addToCart', async (req,res) => {
  const item = req.body.item;
  const sessionID = req.body.user;
  const user = jwt.verify(sessionID, 'shhhhh')

  const result = await db.get(`SELECT user_id FROM users WHERE e_mail='${user.email}'`, {raw: true});
  const user_id = result[0].user_id;

  db.get(`REPLACE INTO users_cart(item_id,user_id) VALUES(
    ( SELECT item_id FROM items WHERE item_id=${item.id}),
    ( SELECT user_id FROM users WHERE user_id=${user_id})
    )`, {raw: true});
});

router.post('/removeFromCart', async (req,res) => {
  const item = req.body.item;
  const sessionID = req.body.user;
  const user = jwt.verify(sessionID, 'shhhhh')

  const result = await db.get(`SELECT user_id FROM users WHERE e_mail='${user.email}'`, {raw: true});
  const user_id = result[0].user_id;

  db.get(`DELETE FROM users_cart WHERE item_id=${item.id} AND user_id=${user_id}`, {raw: true});
  
  res.send(true);
});

router.post('/products', async (req,res) => {
  const result = await db.get(`SELECT * FROM items`, {raw: true});

  res.send(result)
});

router.post('/getProduct', async (req,res) => {
  const id = req.body.id;
  const result = await db.get(`SELECT * FROM items WHERE item_id=${id}`);
  res.send(result)
});

router.post('/getCartItems', async (req,res) => {
  const sessionID = req.body.sessionID;
  const user = jwt.verify(sessionID, 'shhhhh')

  const result = await db.get(`SELECT * FROM users_cart WHERE user_id=${user.user_id}`);
  
  let itemIDs = []
  for(const index of result)
    itemIDs.push(index.item_id);
  let products=[];
  for(const itemID of itemIDs){
    const result2 = await db.get(`SELECT * FROM items WHERE item_id=${itemID}`);
    products.push(result2[0]);
  }
  if(products.length!==0) res.send(products)
  else res.send("none")
});

//console.log(products);
  /* for(let product of products){
    const sql = `INSERT INTO items(item_name,price,description,image,category,store_id,rating_id,brand) VALUES(
      '${product.name}',
      ${product.price},
      '${product.text}',
      '${product.img}',
      '${product.category}',
      ${1},
      NULL,
      '${product.brand}'
    )`;
    await db.get(sql, {raw: true})
    console.log(sql);
  }
 */
  /* await db.get(`REPLACE INTO users_bucket(item_id,user_id) VALUES(
    SELECT user_id FROM users WHERE e_mail='${user.username}',
    ${parseInt(item.id)})`, {raw: true}); */

module.exports = router;