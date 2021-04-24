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

router.post("/getStoreInfo", async (req, res) => {
  const user_id = req.body.user_id;
  const storeInfo = await db.get(`SELECT * FROM rakoon.store WHERE owner_id=${user_id}`);
  const items = await db.get(`SELECT item_id, category FROM rakoon.items WHERE store_id=${storeInfo[0].store_id}`);
  let ownerName = await db.get(`SELECT name, surname FROM rakoon.users WHERE user_id=${user_id}`);
  ownerName = `${ownerName[0].name} ${ownerName[0].surname}`; 

  const categories = new Map();
  for(let item of items){
    console.log(item);
    console.log(item.category);
    console.log(categories.get(item.category));
    if(categories.get(item.category) === undefined)
      categories.set(item.category,1);
    else
      categories.set(item.category, categories.get(item.category)+1)
  }
  console.log(categories);

  storeInfo[0].categories = categories;
  storeInfo[0].items = items;
  storeInfo[0].owner = ownerName;

  console.log(storeInfo[0]);
  res.send({...storeInfo[0], categories: [...categories]});
});



module.exports = router;