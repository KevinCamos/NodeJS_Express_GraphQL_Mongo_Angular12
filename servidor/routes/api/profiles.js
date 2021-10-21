var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
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
          profile: req.profile.toProfileJSONFollowers(req.profile.following),
        });
      }
      return res.json({
        profile: req.profile.toProfileJSONFollowers(
          req.profile.following,
          user
        ),
      });
    });
  } else {
    /* SINO ESTÁS REGISTRAT, SOLS HAURÀS DE VORE ELS SEUS FOLLOWINGS I ELS FOLLOWERS */
    return res.json({
      profile: req.profile.toProfileJSONFollowers(req.profile.following),
    });
  }
});

/* FOLLOW */
router.post('/:username/follow', auth.required, function(req, res, next){
  var profileId = req.profile._id;
  console.log(profileId);

  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }
      // console.log(user)

      return user.follow(profileId, req.profile).then(function () {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
});


/* UNFOLLOW */
router.delete('/:username/follow', auth.required, function(req, res, next){
  var profileId = req.profile._id;
  //   console.log(req.profile)
  // console.log(profileId)
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return user.unfollow(profileId, req.profile).then(function () {
        return res.json({ profile: req.profile.toProfileJSONFor(user) });
      });
    })
    .catch(next);
});

module.exports = router;
