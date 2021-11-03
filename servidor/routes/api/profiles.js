var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Order = mongoose.model("Order");
var auth = require("../auth");

// Preload user profile on routes with ':username'
router.param("username", function (req, res, next, username) {
  User.findOne({ username: username })
    .populate("following")
    .populate("followers")
    .then(function (user) {
      if (!user) {
        return res.sendStatus(404);
      }

      Order.aggregate([
        { $project: { _id: 1, id_user_seller: 1, valoration: 1 } },
        { $match: { id_user_seller: user._id } },
        { $group: { _id: "id_user_seller", media: { $avg: "$valoration" } } },
      ]).then(function (valoration) {
        console.log(valoration);
        req.profile = user;
        if(valoration[0]){
          req.valoration = valoration[0].media?valoration[0].media:0 ;

        }else{
          req.valoration =0
        }
        return next();
      });
      // console.log("entra param");
    })
    .catch(next);
});

// Preload user profile on routes with ':username'
router.param("userfollow", function (req, res, next, username) {
  User.findOne({ username: username })
    // .populate("following")
    // .populate("followers")
    .then(function (user) {
      if (!user) {
        return res.sendStatus(404);
      }
      // console.log("entra param");
      req.profile = user;
      return next();
    })
    .catch(next);
});

/* PROFILE */
router.get("/:username", auth.optional, function (req, res, next) {
  if (req.payload) {
    /* SI ESTÁS REGISTRAT HAS DE VEURE ELS SEUS FOLLOWINGS, ELS FOLLOWERS I SI LI FAS FOLLOW */
    User.findById(req.payload.id).then(function (user) {
      if (!user) {
        return res.json({
          valoration: req.valoration,
          profile: req.profile.toProfileJSONFollowers(
            req.profile.following,
            req.valoration
          ),
        });
      }
      return res.json({
        valoration: req.valoration,
        profile: req.profile.toProfileJSONFollowers(
          req.profile.following,
          req.valoration,
          user
        ),
      });
    });
  } else {
    /* SINO ESTÁS REGISTRAT, SOLS HAURÀS DE VORE ELS SEUS FOLLOWINGS I ELS FOLLOWERS */
    return res.json({
      profile: req.profile.toProfileJSONFollowers(
        req.profile.following,
        req.valoration
      ),
    });
  }
});

/* FOLLOW */
router.post("/:userfollow/follow", auth.required, function (req, res, next) {
  var profileId = req.profile._id;

  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }
      // console.log(user)
      user.updateKarma(40, req.profile);
      return user.follow(profileId, req.profile).then(function () {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
});

/* UNFOLLOW */
router.delete("/:userfollow/follow", auth.required, function (req, res, next) {
  var profileId = req.profile._id;
  //   console.log(req.profile)
  // console.log(profileId)
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }
      user.updateKarma(-40, req.profile);
      return user.unfollow(profileId, req.profile).then(function () {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
});

module.exports = router;
