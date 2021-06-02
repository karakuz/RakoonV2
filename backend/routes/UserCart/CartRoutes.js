const express = require("express");
const router = express.Router();
const Product = require("../../models/item");
const UserCart = require("../../models/userCart");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const db = require('../../config/database.js');

router.post("/cart/product/:id", async (req, res) => {
  const productID = req.params.id;
  const user_id = (typeof req.body.user === typeof []) ? req.body.user.user_id : (jwt.verify(req.body.user, 'shhhhh')).user_id;
  let isExists = false;

  const cart_items = await db.get(`SELECT item_id FROM users_cart WHERE user_id = ${user_id}`);
  for(let row of cart_items){
    if(row.item_id === parseInt(productID)){
      isExists = true;
    }
  }
  console.log("cart_items:");
  console.log(cart_items);
  if(!isExists){
    await db.get(`INSERT INTO users_cart(item_id,user_id) VALUES(
      ( SELECT item_id FROM items WHERE item_id=${productID}),
      ( SELECT user_id FROM users WHERE user_id=${user_id})
    )`, { raw: true });
    res.send("done");
  } else {
    res.send("exists");
  }
  
  /* const CartProduct = await UserCart.create({
    item_id: productId,
    user_id: user_id
  }).then((res) => res.send("done"))
    .catch(error => res.status(404).send(error)); */
});

router.delete("/cart/product/:id", async (req, res) => {
  const productID = req.params.id;
  const sessionID = req.body.user;
  const user = jwt.verify(sessionID, 'shhhhh');

  await db.get(`DELETE FROM users_cart WHERE item_id=${productID} AND user_id=(
    SELECT user_id FROM users WHERE e_mail='${user.e_mail}'
  )`, { raw: true });

  /* const CartProduct = await UserCart.destroy({
    where: {
      item_id: productId,
      user_id: user.user_id
    }
  }); */
  res.send(true);
});

router.post("/cart/products2", async (req, res) => {
  const item_ids = req.body.item_ids;
  let products = [];

  for(let item_id of item_ids){
    const product = await db.get(`
    SELECT 
    items.*,
      store.store_name,
      campaign_items.old_price, 
      0 as rate
    FROM items
    LEFT JOIN store 
    ON store.store_id = items.store_id 
    LEFT JOIN campaign_items 
    ON campaign_items.item_id = items.item_id
    WHERE items.item_id = ${item_id}
    ORDER BY item_id;
    `);
    products.push(product);
  }

  let map = new Map();
  for(let product of products){
    map.set(product[0].item_id, {...product[0]});
  }
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

  for(let product of rated_products){
    if(map.get(product.item_id) !== undefined)
      map.set(product.item_id, {...product, old_price: map.get(product.item_id).old_price});
  }

  res.send(Array.from(map.values()));
});

router.post("/cart/products", async (req, res) => {
  const sessionID = req.body.sessionID;
  const user = jwt.verify(sessionID, 'shhhhh');

  const products = await db.get(`
    SELECT 
    items.*,
      store.store_name,
      campaign_items.old_price, 
      0 as rate
    FROM users_cart
    JOIN items
    ON items.item_id = users_cart.item_id
    LEFT JOIN store 
    ON store.store_id = items.store_id 
    LEFT JOIN campaign_items 
    ON campaign_items.item_id = items.item_id
    WHERE user_id = ${user.user_id}
    ORDER BY item_id;
  `);
  console.log(products);

  let map = new Map();
  for(let product of products)
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
    if(map.get(product.item_id) !== undefined)
      map.set(product.item_id, {...product, old_price: map.get(product.item_id).old_price});
  
  res.send(Array.from(map.values()));


  /* const productIDs = await UserCart.findAll({
    attributes: ["item_id"],
    where: {
      user_id: user.user_id
    }
  });

  let products = await getProducts(productIDs);
  console.log(products);
  if (products.length !== 0) res.send(products);
  else res.send("none"); */
});

router.post('/getCartItems', async (req, res) => {
  const sessionID = req.body.sessionID;
  const user = jwt.verify(sessionID, 'shhhhh');

  const products = await db.get(`SELECT * FROM users_cart WHERE user_id='${user.user_id}';`);
  res.send(products);
});

const getProducts = async function (itemIDs) {
    let products = [];
    for (const itemID of itemIDs) {
        const product = await Product.findAll({ where: { item_id: itemID.item_id } });
        products.push(product[0]);
    }
    return products;
}

module.exports = router;