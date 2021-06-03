const express = require("express");
const router = express.Router();
const db = require('../../config/database.js');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const User = require("../../models/user");
const webpush = require("web-push");
const Notification = require("../../models/notification_name");
const OneSignal = require('onesignal-node');



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
  const items = (req.body.role_id === 3) ? await db.get(`SELECT * FROM rakoon.items WHERE store_id=
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
  for (let item of items) {
    if (categories.get(item.category) === undefined)
      categories.set(item.category, 1);
    else
      categories.set(item.category, categories.get(item.category) + 1)
  }

  storeInfo[0].categories = categories;
  storeInfo[0].items = items;
  storeInfo[0].owner = ownerName;

  res.send({ ...storeInfo[0], categories: [...categories] });
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

  const orderID = await db.get(`
    SELECT customer_id FROM orders
    WHERE seller_id = (SELECT store_id FROM items WHERE item_id=${productID})
    GROUP BY customer_id
  `);

  let orderIDs = [];
  for (let obj of orderID)
    if (!orderIDs.includes(obj.customer_id))
      orderIDs.push(obj.customer_id);

  res.send({ comments: comments, userIDs: orderIDs });
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

  if (accept) {
    await db.get(`UPDATE rakoon.ratings SET is_verified=1 WHERE rating_id=${rating_id}`);
    res.send("verified");
  }
  else {
    await db.get(`UPDATE rakoon.ratings SET is_verified=-1 WHERE rating_id=${rating_id}`);
    res.send("notverified");
  }
});

router.post("/store/orders", async (req, res) => {
  const user = req.body.user;

  const orders = await db.get(`
      SELECT  orders.*,
        items.item_name,
        items.image 
      FROM orders
      JOIN items
      ON items.item_id = orders.item_id
      WHERE seller_id=(
        SELECT store_id FROM sales_managers WHERE user_id = ${user.user_id}
      ) ORDER BY date DESC
  `);

  const map = new Map();
  for (let order of orders) {
    if (map.get(order.date) === undefined) map.set(order.date, [order])
    else map.set(order.date, [...map.get(order.date), order]);
  }

  const obj = {};
  const it = map.keys();
  for (let next = it.next(); next.value !== undefined; next = it.next())
    obj[next.value] = map.get(next.value)

  res.send(obj);
});

router.put("/store/updateorder", async (req, res) => {
  const orders = req.body.orders;
  console.log("orders: ");
  console.log(orders);
  for (let order of orders)
    await db.get(`UPDATE orders SET status='${order.status}' WHERE item_id=${order.item_id} AND order_id=${order.order_id}`);
  res.send("done");
});

router.post("/getCampaigns", async (req, res) => {
  const user_id = req.body.user_id;
  const role_id = req.body.role_id;


  const campaigns = (role_id === 3) ?
    //store owner
    await db.get(`
      SELECT campaigns.*, items.*, users.name, users.surname FROM(
          SELECT campaign_items.*, J.by_date, J.user_id, J.discount FROM
            (SELECT campaign_id, discount, by_date, user_id FROM campaigns WHERE store_id=(
              SELECT store_id FROM store WHERE owner_id=${user_id}
            )) AS J
          JOIN campaign_items ON J.campaign_id = campaign_items.campaign_id) AS campaigns
        JOIN items ON items.item_id = campaigns.item_id
      JOIN users ON users.user_id = campaigns.user_id
    `) :
    //sales manager
    await db.get(`
      SELECT campaigns.*, items.*, users.name, users.surname FROM(
          SELECT campaign_items.*, J.by_date, J.user_id, J.discount FROM
            (SELECT campaign_id, discount, by_date, user_id FROM campaigns WHERE store_id=(
              SELECT store_id FROM sales_managers WHERE user_id=${user_id}
            )) AS J
          JOIN campaign_items ON J.campaign_id = campaign_items.campaign_id) AS campaigns
        JOIN items ON items.item_id = campaigns.item_id
      JOIN users ON users.user_id = campaigns.user_id
    `);
  if (campaigns.length !== 0) {
    let map = new Map();
    for (let item of campaigns) {
      if (map.get(item.campaign_id) === undefined) map.set(item.campaign_id, [item])
      else map.set(item.campaign_id, [...map.get(item.campaign_id), item])
    }

    let obj = {};

    Array.from(map.keys()).forEach(campaign_id => obj[campaign_id] = map.get(campaign_id));
    res.send(obj);
  } else {
    res.send([]);
  }


});

function decimal(num) {
  const str = String(num);
  console.log("str: " + str);

  if (str.includes('.'))
    return parseFloat(str.split('.')[0] + '.' + str.split('.')[1].substring(0, 2));
  return parseFloat(str);
}

router.post("/store/deployCampaignByCategory", async (req, res) => {
  const user_id = req.body.user_id;
  const item_ids = req.body.item_ids;
  const date = req.body.date;
  const discount = (req.body.discount >= 10) ? parseFloat('0.' + req.body.discount) : parseFloat('0.0' + req.body.discount);

  await db.get(`
    INSERT INTO campaigns(store_id, user_id, by_date, discount)
    VALUES((SELECT store_id FROM sales_managers WHERE user_id=${user_id}), ${user_id}, '${date}', ${discount});
  `);

  for (let item_id of item_ids) {
    const old_price = await db.get(`SELECT price FROM items WHERE item_id=${item_id}`);
    const new_price = decimal(old_price[0].price * (1 - discount));

    await db.get(`
      INSERT INTO campaign_items(item_id, campaign_id, old_price, new_price) VALUES(
        (SELECT item_id FROM items WHERE item_id=${item_id}),
        (SELECT campaign_id FROM campaigns ORDER BY campaign_id DESC LIMIT 1),
        ${old_price[0].price},
        ${new_price}
      )
    `);

    await db.get(`
        UPDATE items SET price = ${new_price} WHERE item_id = ${item_id}
    `);
  }

  res.send("done");
});

router.post("/store/deployCampaignByProduct", async (req, res) => {
  const user_id = req.body.user_id;
  const product = req.body.product;
  const date = req.body.date;
  const discount = parseFloat('0.' + req.body.discount);

  await db.get(`
    INSERT INTO campaigns(store_id, user_id, by_date, discount)
    VALUES((SELECT store_id FROM sales_managers WHERE user_id=${user_id}), ${user_id}, '${date}', ${discount});
  `);

  const item_id = await db.get(`SELECT item_id FROM items WHERE item_name='${product}'`);
  const old_price = await db.get(`SELECT price FROM items WHERE item_id=${item_id[0].item_id}`);
  const new_price = decimal(old_price[0].price * (1 - discount));

  await db.get(`
    INSERT INTO campaign_items(item_id, campaign_id, old_price, new_price) VALUES(
      (SELECT item_id FROM items WHERE item_id=${item_id[0].item_id}),
      (SELECT campaign_id FROM campaigns ORDER BY campaign_id DESC LIMIT 1),
      ${old_price[0].price},
      ${new_price}
    )
  `);

  await db.get(`
    UPDATE items SET price = ${new_price} WHERE item_id = ${item_id[0].item_id}
  `);

  res.send("done");
});


router.post("/store/deployCampaignByPrice", async (req, res) => {
  const user_id = req.body.user_id;
  const date = req.body.date;
  const discount = parseFloat('0.' + req.body.discount);
  const minPrice = parseFloat(req.body.minPrice);
  const maxPrice = parseFloat(req.body.maxPrice);

  await db.get(`
    INSERT INTO campaigns(store_id, user_id, by_date, discount)
    VALUES((SELECT store_id FROM sales_managers WHERE user_id=${user_id}), ${user_id}, '${date}', ${discount});
  `);

  const item_ids = await db.get(`
    SELECT item_id FROM rakoon.items WHERE price > ${minPrice} AND price < ${maxPrice} AND store_id=(
      SELECT store_id FROM sales_managers WHERE user_id=${user_id}
    )
  `);

  for (let item_id of item_ids) {
    const old_price = await db.get(`SELECT price FROM items WHERE item_id=${item_id.item_id}`);
    const new_price = decimal(old_price[0].price * (1 - discount));

    await db.get(`
      INSERT INTO campaign_items(item_id, campaign_id, old_price, new_price) VALUES(
        (SELECT item_id FROM items WHERE item_id=${item_id.item_id}),
        (SELECT campaign_id FROM campaigns ORDER BY campaign_id DESC LIMIT 1),
        ${old_price[0].price},
        ${decimal(old_price[0].price * (1 - discount))}
      )
    `);

    await db.get(`
      UPDATE items SET price = ${new_price} WHERE item_id = ${item_id[0].item_id}
    `);
  }

  res.send("done");
});

router.post("/store/getSales", async (req, res) => {
  const user_id = req.body.user_id;

  const sales = await db.get(`
    SELECT
    COUNT(orders.order_id) as products,
    DATE_FORMAT(orders.date, "%d-%m-%Y") as name
      FROM (SELECT store_id FROM sales_managers WHERE user_id=${user_id})
        AS sales_managers
      JOIN orders ON orders.seller_id = sales_managers.store_id
      WHERE status = 'delivered'
      GROUP BY date
  `);

  const category = await db.get(`
    SELECT
    COUNT(category) as products,
    category as name
      FROM (SELECT store_id FROM sales_managers WHERE user_id=${user_id})
        AS sales_managers
      JOIN orders ON orders.seller_id = sales_managers.store_id
      JOIN items ON items.item_id = orders.item_id
      WHERE status = 'delivered'
      GROUP BY category
  `);
  console.log("line 398:");
  console.log({ sales: sales, category: category });

  res.send({ sales: sales, category: category });
});

router.post("/store/removeCampaign", async (req, res) => {
  const campaign_id = req.body.campaign_id;

  const item_ids = await db.get(`SELECT item_id,old_price FROM campaign_items WHERE campaign_id=${campaign_id}`);
  for (let item of item_ids) {
    const item_id = item.item_id;
    const old_price = item.old_price;

    await db.get(`UPDATE items SET price=${old_price} WHERE item_id=${item_id}`);
  }

  await db.get(`
    DELETE FROM campaign_items WHERE campaign_id=${campaign_id};
  `);
  await db.get(`
    DELETE FROM campaigns WHERE campaign_id=${campaign_id};
  `);

  res.send("done");
});

router.post("/store/sendNotification", async (req, res) => {
  const message = req.body.message;
  const client = new OneSignal.Client('d02c9816-ba91-486b-9409-e4c26855cc7e', 'YjkyY2Q0MDQtMjA2Yi00NGFmLWEyZDktNjNhZWEzOGRiZmE3');
  const notification = {
    contents: {
      'en': message,
    },
    included_segments: ['Subscribed Users']
  };
  client.createNotification(notification).then(res => {

  }).catch(e => {
    console.log(e);
  });
});

router.post("/store/setNotification", async (req, res) => {
  const message = req.body.message;
  await Notification.update({ notification_body: message }, {
    where: {
      idnotification_name: 1
    }
  });
  res.send("");
})

module.exports = router;
