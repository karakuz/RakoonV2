const express = require("express");
const router = express.Router();
const db = require('../../config/database.js');

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



module.exports = router;