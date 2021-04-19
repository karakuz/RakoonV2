const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");


router.put("/profile/update", async (req, res) => {
  var userUpdate = req.body.user;
  await User.update({ surname: userUpdate.surname, name: userUpdate.name, e_mail: userUpdate.e_mail }, {
    where: {
      e_mail: userUpdate.oldemail
    }
  });
  res.send(true);
});

router.post("/profile/user", async (req, res) => {
  const sessionID = req.body.user;
  console.log(sessionID);
  const user = await jwt.verify(sessionID, 'shhhhh');
  console.log("23123123");
  res.send(user);
})


module.exports = router;