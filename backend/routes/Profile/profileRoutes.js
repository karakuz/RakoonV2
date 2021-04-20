const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");


router.put("/profile/update", async (req, res) => {
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

router.post("/profile/user", async (req, res) => {
  const sessionID = req.body.sessionID;
  console.log(sessionID);
  const user = await jwt.verify(sessionID, 'shhhhh');
  var updatedUser = await User.findOne({ where: { user_id: user.user_id } });
  res.send(updatedUser);
})


module.exports = router;