const express = require("express");
const router = express.Router();
const  User = require("../../models/user");


router.put("/profile/update", async (req, res) => {
    var userUpdate = req.body.user;
    await User.update({ surname: userUpdate.surname, name: userUpdate.name, e_mail: userUpdate.e_mail}, {
        where: {
         user_id : userUpdate.id
        }
      });
      res.send(true);
});

module.exports = router;