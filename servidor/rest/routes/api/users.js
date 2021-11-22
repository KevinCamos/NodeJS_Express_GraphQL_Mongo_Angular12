var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");
var User = mongoose.model("User");
var auth = require("../auth");

let client = require('prom-client');

const counterUsersEndpoint = new client.Counter({
  name: 'counterUsersEndpoint',
  help: 'The total number of processed requests to get endpoint'
});

/* GET USER TOKEN (SETTINGS) */
router.get("/user", auth.required, function (req, res, next) {
  counterUsersEndpoint.inc();
  console.log(req.payload);
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});
/* Get desde el servidor GraphQL */
router.get("/user-token-gql", auth.required, function (req, res, next) {
  counterUsersEndpoint.inc();
  console.log(req.payload);
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json(user);
    })
    .catch(next);
});
/* UPDATE USER (SETTINGS) */
router.put("/user", auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }
      /* MILLORA DE CODI  */
      user.username = req.body.user.username || user.username;
      user.email = req.body.user.email || user.email;
      user.bio = req.body.user.bio || user.bio;
      user.image = req.body.user.image || user.image;
      if (req.body.user.password) user.setPassword(req.body.user.password);

      return user.save().then(function () {
        return res.json({ user: user.toAuthJSON() });
      });
    })
    .catch(next);
});

/*LOGIN*/
router.post("/users/login", async (req, res, next) => {
  try {
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
          console.log("err");
          return next(err);
        }

        if (user) {
          user.token = user.generateJWT();
          return res.json({ user: user.toAuthJSON() });
        } else {
          console.log("else");
          return res.status(422).json(info);
        }
      }
    )(req, res, next);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/*REGISTER */
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
