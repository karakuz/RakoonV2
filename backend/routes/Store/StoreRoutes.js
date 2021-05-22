const express = require("express");
const router = express.Router();
const db = require('../../config/database.js');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const User = require("../../models/user");

const VerifyMail = function (user, token) {
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rakoonecommerceservices@gmail.com',
      pass: "rakoon123"
    }
  });
  var mailOptions = {
    to: user.e_mail,
    from: 'rakoonecommerceservices@gmail.com',
    subject: 'Activation E-Mail',
    text: 'Hello,\n\n' +
      'To activate to your account please click the link below \n' +
      'http://localhost:3000/activate/' + token
  };
  smtpTransport.sendMail(mailOptions, function (err) {
    console.log('Success! e-mail has been sent');
  });
}

router.post("/getStoreName", async (req, res) => {
  const user_id = req.body.user_id;
  const storeName = (req.body.role_id === 3) ? 
    await db.get(`SELECT store_name FROM store WHERE owner_id=${user_id}`) :
    await db.get(`SELECT store_name FROM store WHERE store_id=(
        SELECT store_id FROM sales_managers WHERE user_id=${user_id}
      )`);

  res.send(storeName);
});

router.post("/getStoreItems", async (req, res) => {
  const user_id = req.body.user_id;
  const items = ( req.body.role_id === 3 ) ? await db.get(`SELECT * FROM rakoon.items WHERE store_id=
	  (SELECT store_id FROM rakoon.store WHERE owner_id=${user_id})
  `) : 
  await db.get(`SELECT * FROM rakoon.items WHERE store_id=(
    SELECT store_id FROM sales_managers WHERE user_id=${user_id}
  )`);
  res.send(items);
});

router.post("/getStoreInfo", async (req, res) => {
  const user_id = req.body.user_id;
  const storeInfo = (req.body.role_id === 3) ? await db.get(`SELECT * FROM rakoon.store WHERE owner_id=${user_id}`) : 
    await db.get(`
      SELECT * FROM store WHERE store_id=
        (SELECT store_id FROM sales_managers WHERE user_id=${user_id})`);
  
  const items = await db.get(`SELECT item_id, category FROM rakoon.items WHERE store_id=${storeInfo[0].store_id}`);
  let ownerName = await db.get(`SELECT name, surname FROM rakoon.users WHERE user_id=${storeInfo[0].owner_id}`);
  ownerName = `${ownerName[0].name} ${ownerName[0].surname}`; 

  const categories = new Map();
  for(let item of items){
    if(categories.get(item.category) === undefined)
      categories.set(item.category,1);
    else
      categories.set(item.category, categories.get(item.category)+1)
  }

  storeInfo[0].categories = categories;
  storeInfo[0].items = items;
  storeInfo[0].owner = ownerName;

  res.send({...storeInfo[0], categories: [...categories]});
});

router.post("/addProduct", async (req, res) => {
  const item = req.body.item;
  await db.get(`INSERT INTO rakoon.items(item_name,price,description,image,category,store_id,countInStock,brand)
    VALUES('${item.name}',${parseFloat(item.price)}, '${item.description}', '${item.image}', '${item.category}', (SELECT store_id FROM rakoon.store WHERE owner_id=${item.user_id}), ${parseInt(item.count)}, '${item.brand}')`);
  res.send("done");
});

router.put("/editProduct", async (req, res) => {
  const item = req.body.item;
  await db.get(`UPDATE rakoon.items SET 
    item_name = '${item.name}',
    price = ${parseFloat(item.price)},
    description = '${item.description}',
    image = '${item.image}',
    category = '${item.category}',
    store_id = (SELECT store_id FROM rakoon.store WHERE owner_id=${item.user_id}),
    countInStock = ${parseInt(item.count)},
    brand = '${item.brand}'
    WHERE item_id=${item.item_id};`);

  res.send("done");
});


/* user:{
  email: registerEmail,
  name: registerName,
  lastname: registerSurname,
  password: registerPassword
} */

router.post("/addSalesManager", async (req, res) => {
  const user = req.body.user;
  const user_ = await User.findOne({ where: { e_mail: user.email } });

  if (user_ === null || user_ === undefined) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    let activate = await bcrypt.hash(user.name, 10);
    activate = activate.replace(/\//g, "");

    await db.get(`INSERT INTO rakoon.users(e_mail, name, surname, password, role_id, is_verified, activate_token)
      VALUES('${user.email}', '${user.name}', '${user.lastname}', '${hashedPassword}', ${2}, ${0}, '${activate}')`);
    await db.get(`INSERT INTO rakoon.sales_managers(user_id, store_id) VALUES(
      (SELECT user_id FROM rakoon.users WHERE e_mail='${user.email}'),
      (SELECT store_id FROM rakoon.store WHERE owner_id=${user.owner_id})
    )`);

    VerifyMail(user.email, activate);

    res.send(true);
  } else {
    res.send({ res: "exists" });
  }
});

router.post("/getSalesManagers", async (req, res) => {
  const user_id = req.body.user_id;

  const salesManagers = (req.body.role_id === 3) ? await db.get(`
    SELECT name, surname FROM users JOIN (
      SELECT user_id FROM rakoon.sales_managers 
        WHERE store_id = (SELECT store_id FROM store WHERE owner_id=${user_id})
      ) sales_managers ON users.user_id=sales_managers.user_id`
    ) : 
    await db.get(`
    SELECT name, surname FROM users JOIN (
      SELECT user_id FROM rakoon.sales_managers 
        WHERE store_id = (SELECT store_id FROM sales_managers WHERE user_id=${user_id})
      ) sales_managers ON users.user_id=sales_managers.user_id`);
    
  res.send(salesManagers);
});

router.post("/getComments/:id", async (req, res) => {
  const productID = req.params.id;

  const comments = await db.get(`
    SELECT name, surname, comment, rate, users.user_id, DATE_FORMAT(date, '%d/%m/%Y') AS date FROM rakoon.ratings 
      JOIN users ON ratings.user_id=users.user_id WHERE item_id=${productID} AND ratings.is_verified=1;
  `);
  
  res.send(comments);
});

router.post("/getStoreComments", async (req, res) => {
  const user_id = req.body.user_id;

  const unrated = await db.get(`
  SELECT * FROM
    (SELECT 
      ratings.rating_id,
        ratings.user_id,
        ratings.comment,
        ratings.rate,
        ratings.date,
        ratings.store_id,
        ratings.is_verified,
        items.item_id,
        items.item_name,
        users.name,
        users.surname
      FROM ratings
      JOIN items ON ratings.item_id = items.item_id
      JOIN users ON users.user_id = ratings.user_id) AS J
    WHERE J.store_id = (SELECT store_id FROM rakoon.store WHERE owner_id=${user_id}) 
    AND J.is_verified = 0
  `);

  /* const map = new Map();
  for(let comment of unrated){
    console.log(comment);
    if(map.get(comment.item_id) !== undefined)
      map.set(comment.item_id, [...map.get(comment.item_id),comment]);
    else 
      map.set(comment.item_id, [comment]);
    }
  console.log(map) */
  
  //const rates = await db.get(`SELECT `);
  res.send(unrated);
}); 

router.put("/verifyComment", async (req, res) => {
  const rating_id = req.body.rating_id;
  const accept = req.body.accept;

  if(accept){
    await db.get(`UPDATE rakoon.ratings SET is_verified=1 WHERE rating_id=${rating_id}`);
    res.send("verified");
  } 
  else{
    await db.get(`UPDATE rakoon.ratings SET is_verified=-1 WHERE rating_id=${rating_id}`);
    res.send("notverified");
  }
});

router.post("/store/orders", async (req, res) => {
  const user = req.body.user;
  
  const orders = await db.get(`
      SELECT  orders.*, 
        items.item_name, 
        items.image,
        items.price FROM orders 
      JOIN items 
      ON items.item_id = orders.item_id
      WHERE seller_id=(
        SELECT store_id FROM sales_managers WHERE user_id = ${user.user_id}
      ) ORDER BY date DESC
  `);

  const map = new Map();
  for(let order of orders){
    if(map.get(order.date) === undefined) map.set(order.date, [order])
    else map.set(order.date, [...map.get(order.date), order]);
  }

  const obj = {};
  const it = map.keys();
  for(let next = it.next(); next.value !== undefined; next = it.next())
    obj[next.value] = map.get(next.value)

  res.send(obj);
});

router.put("/store/updateorder", async (req, res) => {
  const orders = req.body.orders;
  for(let order of orders)
    await db.get(`UPDATE orders SET status='${order.status}' WHERE item_id=${order.item_id} AND order_id=${order.order_id}`);
  res.send("done");
});

router.get("/getCampaigns", async (req, res) => {
  const user_id = req.body.user_id;
  const role_id = req.body.role_id;

  const campaigns =(role_id === 3) ?
    //store owner
    await db.get(`
    SELECT * FROM(
      SELECT campaign_items.*, J.user_id FROM
        (SELECT campaign_id, user_id FROM campaigns WHERE store_id=(
          SELECT store_id FROM store WHERE owner_id=${user_id}
        )) AS J
      JOIN campaign_items ON J.campaign_id = campaign_items.campaign_id) AS campaigns
    JOIN items WHERE items.item_id = campaigns.item_id
      `) : 
    //sales manager
    await db.get(`
    SELECT * FROM(
      SELECT campaign_items.*, J.user_id FROM
        (SELECT campaign_id, user_id FROM campaigns WHERE store_id=(
          SELECT store_id FROM sales_managers WHERE user_id=${user_id}
        )) AS J
      JOIN campaign_items ON J.campaign_id = campaign_items.campaign_id) AS campaigns
      JOIN items WHERE items.item_id = campaigns.item_id
    `); 
  
  res.send(campaigns);
});

module.exports = router;