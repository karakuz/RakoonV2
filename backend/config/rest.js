const express = require("express");
const router = express.Router();
const db = require('./database');
const jwt = require('jsonwebtoken');

router.post('/addToCart', async (req,res) => {
  const item = req.body.item;
  const sessionID = req.body.user;
  const user = jwt.verify(sessionID, 'shhhhh')

  console.log("Item");
  console.log(item);
  console.log("User");
  console.log(user);

  console.log('IN ROUTE')
  const result = await db.get(`SELECT user_id FROM users WHERE e_mail='${user.username}'`, {raw: true});
  const user_id = result[0].user_id;

  console.log(typeof item.id);
  console.log(typeof user_id);

  db.get(`REPLACE INTO users_cart(item_id,user_id) VALUES(
    ( SELECT item_id FROM items WHERE item_id=${item.id}),
    ( SELECT user_id FROM users WHERE user_id=${user_id})
    )`, {raw: true});

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


});

router.post('/products', async (req,res) => {
  console.log("In /products");
  const result = await db.get(`SELECT * FROM items`, {raw: true});
  res.send(result)
});

router.post('/getProduct', async (req,res) => {
  const id = req.body.id;
  const result = await db.get(`SELECT * FROM items WHERE item_id=${id}`, {raw: true});
  res.send(result)
});



module.exports = router;