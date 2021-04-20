const express = require("express");
const router = express.Router();
const db = require('../../config/database.js');

router.post("/getStoreName", async (req, res) => {
  console.log("IN getStoreName");
  const user_id = req.body.user_id;
  const storeName = await db.get(`SELECT store_name FROM store WHERE owner_id=${user_id}`);

  res.send(storeName);
});


module.exports = router;