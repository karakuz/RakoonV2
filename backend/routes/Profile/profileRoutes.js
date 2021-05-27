const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require('../../config/database');

router.put("/profile/update", async (req, res) => { // User update
  const sessionID = req.body.sessionID;
  console.log(sessionID);
  const user = await jwt.verify(sessionID, 'shhhhh');
  const userUpdate = req.body.user;
  await User.update({ surname: userUpdate.surname, name: userUpdate.name, e_mail: userUpdate.e_mail }, {
    where: {
      user_id: user.user_id
    }
  });
  res.send(true);
});

router.post("/profile/user", async (req, res) => { // Get user info 
  const sessionID = req.body.sessionID;
  console.log(sessionID);
  const user = await jwt.verify(sessionID, 'shhhhh');
  var updatedUser = await User.findOne({ where: { user_id: user.user_id } });
  res.send(updatedUser);
});


router.put("/profile/2fa/update", async (req, res) => {
  const sessionID = req.body.sessionID;

  const user = await jwt.verify(sessionID, 'shhhhh');
  const twofaenable = req.body.twofaenable;
  console.log(user.user_id);
  console.log(twofaenable);
  await User.update({ is_twofa: twofaenable ? 1 : 0 }, {
    where: {
      user_id: user.user_id
    }
  });
  res.send(true);
});

router.post("/profile/passwordUpdate", async (req, res) => {
  const sessionID = req.body.sessionID;
  const sessionuser = await jwt.verify(sessionID, 'shhhhh');
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  var user = await User.findOne(({ where: { user_id: sessionuser.user_id } }));

  bcrypt.compare(oldPassword, user.password, async (err, result) => {
    console.log(result);
    if (result) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.update({ password: hashedPassword }, {
        where: {
          user_id: user.user_id
        }
      });
      res.send(true);
    }
    else {
      res.send(false);
    }
  })
});

router.post("/profile/role", async (req, res) => { // Get role info
  const sessionID = req.body.sessionID;
  const sessionuser = await jwt.verify(sessionID, 'shhhhh');
  var user = await User.findOne(({ where: { user_id: sessionuser.user_id } }));

  res.send(String(user.role_id));

});


router.post("/profile/orders", async (req, res) => {
  const user = await jwt.verify(req.body.sessionID, 'shhhhh');
  const user_id = user.user_id;
  console.log("User id: " + user_id);

  const orders = await db.get(`
      SELECT orders.*,
        items.item_name,
        items.image,
          items.price FROM (SELECT * FROM orders) AS orders
      JOIN items ON items.item_id = orders.item_id
      WHERE customer_id = ${user_id}
      ORDER BY date DESC
  `);
  console.log("orders:");
  console.log(orders); 

  //pending
  //preparing
  //in cargo
  //delivered

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




module.exports = router;