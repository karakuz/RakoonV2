const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require('bcryptjs');
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




module.exports = router;