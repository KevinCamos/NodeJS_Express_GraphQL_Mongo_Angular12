var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");
var User = mongoose.model("User");
// var auth = require('../auth');

router.post("/users/login", async (req, res, next) => {
  try {

    console.log("eh")
    if (!req.body.user.email) {
      await res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
      await res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) {
          console.log("err")
          return next(err);
        }

        if (user) {
          console.log("user")

          user.token = user.generateJWT();
          return res.json({ user: user.toAuthJSON() });
        } else {
          console.log("else")

          return res.status(422).json(info);
        }
      }
    )(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/**REGISTER */
router.post("/users", async (req, res, next) => {
  try {
    var user = new User();
    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    console.log(user);

    await user
      .save()
      .then(function () {
        return res.json({ user: user.toAuthJSON() });
      })
      .catch(next);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

module.exports = router;
