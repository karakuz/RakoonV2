const express = require("express");
const router = express.Router();

router.post('/addToCart', (req,res) => {
  const item = req.body.item;
  const user = req.body.user;

  console.log("Item");
  console.log(item);
  console.log("User");
  console.log(user);
});

router.post('/', (req,res) => {

});


module.exports = router;