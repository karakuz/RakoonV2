const express = require("express");
const router = express.Router();
const Product = require("../../models/item");
const UserCart = require("../../models/userCart");
const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const db = require('../../config/database.js');

router.post("/cart/product/:id", async (req, res) => {
  const productId = req.params.id;
  const sessionID = req.body.user;
  const user = jwt.verify(sessionID, 'shhhhh');

  const CartProduct = UserCart.create({
    item_id: productId,
    user_id: user.user_id
  }).then((res) => res.send("done"))
    .catch(error => res.status(404).send(error));
});

router.delete("/cart/product/:id", async (req, res) => {
  const productId = req.params.id;
  const sessionID = req.body.user;
  const user = jwt.verify(sessionID, 'shhhhh');
  const CartProduct = await UserCart.destroy({
    where: {
      item_id: productId,
      user_id: user.user_id
    }
  });
  res.send(true);
});

router.post("/cart/products", async (req, res) => {
  const sessionID = req.body.sessionID;
  const user = jwt.verify(sessionID, 'shhhhh');
  const productIDs = await UserCart.findAll({
    attributes: ["item_id"],
    where: {
      user_id: user.user_id
    }
  });

  let products = await getProducts(productIDs);
  if (products.length !== 0) res.send(products);
  else res.send("none");
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