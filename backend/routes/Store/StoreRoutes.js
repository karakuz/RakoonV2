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
  const storeName = await db.get(`SELECT store_name FROM store WHERE owner_id=${user_id}`);

  res.send(storeName);
});

router.post("/getStoreItems", async (req, res) => {
  const user_id = req.body.user_id;
  const items = await db.get(`SELECT * FROM rakoon.items WHERE store_id=
	  (SELECT store_id FROM rakoon.store WHERE owner_id=${user_id})
  `);
  res.send(items);
});

router.post("/getStoreInfo", async (req, res) => {
  const user_id = req.body.user_id;
  const storeInfo = await db.get(`SELECT * FROM rakoon.store WHERE owner_id=${user_id}`);
  const items = await db.get(`SELECT item_id, category FROM rakoon.items WHERE store_id=${storeInfo[0].store_id}`);
  let ownerName = await db.get(`SELECT name, surname FROM rakoon.users WHERE user_id=${user_id}`);
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
  const owner_id = req.body.user_id;

  const salesManagers = await db.get(`
    SELECT name, surname FROM users JOIN (
      SELECT user_id FROM rakoon.sales_managers 
        WHERE store_id = (SELECT store_id FROM store WHERE owner_id=${owner_id})
      ) sales_managers ON users.user_id=sales_managers.user_id`
  );
  
  res.send(salesManagers);
});

module.exports = router;