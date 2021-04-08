const express = require("express");
const router = express.Router();
const db = require('./database');
const jwt = require('jsonwebtoken');




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