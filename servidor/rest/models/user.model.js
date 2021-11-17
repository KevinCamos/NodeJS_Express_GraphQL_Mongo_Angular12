const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");
var jwt = require("jsonwebtoken"); //npm install jsonwebtoken
var secret = process.env.SECRET;

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      lowecase: true,
      /* unique: true, */

      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    bio: {
      type: String,
      default: "",
      maxLength: 1000,
    },
    image: String,
    hash: String, //?
    salt: String, //?
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    karma: {type: Number, default: 0}
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "is already taken" });

/**
 * Validación de la contraseña del usuario
 * @param {*} password
 * @returns
 */
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};
/**
 * Codigica la contraseña
 * @param {*} password
 */
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

/**Genera un Token con JWT */
UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000),
    },
    secret
  );
};

/* Favorite */
UserSchema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }
  return this.save();
};

UserSchema.methods.unfavorite = function (id) {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = function (id) {
  return this.favorites.some(function (favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

/* Follow */
UserSchema.methods.follow = function (id, userFollow) {
  if (userFollow.followers.indexOf(this._id) === -1) {
    userFollow.followers.push(this._id);
  }
  userFollow.save();
  
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }
  return this.save();
};

UserSchema.methods.unfollow = function (id, userFollowed) {

  userFollowed.followers.remove(this._id);
  userFollowed.save();
  
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function (id) {
  return this.following.some(function (followId) {
    return followId.toString() === id.toString();
  });
};

/* Karma */
UserSchema.methods.updateKarma = function (qty, userKarma) {
  userKarma.karma = userKarma.karma + qty;
};

UserSchema.methods.updateKarmaSave = function (qty, userKarma) {
  userKarma.karma = userKarma.karma + qty;
  return userKarma.save();
};

/* toJSONFor  */

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image || "bbyoda.png",
  };
};

UserSchema.methods.toProfileJSONSimpleFor = function (user) {
/*   console.log("-----------------------------------");
  console.log(user.isFollowing(this._id));
  console.log(user.following);
  console.log("-----------------------------------"); */
  return {
    username: this.username,
    image: this.image || "bbyoda.png",
    isFollow: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "bbyoda.png",
    favorites: this.favorites,
    following: user ? user.isFollowing(this._id) : false,
    followers: this.followers,
  };
};

UserSchema.methods.toProfileJSONFollowers = function (users, valoration, userJWT) {
  // var followers = new Array();

  users.map((user, i) => (users[i] = user.toProfileJSONSimpleFor(userJWT)));
  this.followers.map(
    (follower, i) => (this.followers[i] = follower.toProfileJSONSimpleFor(userJWT))
  );
 
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "bbyoda.png",
    favorites: this.favorites,
    following: users,
    followers: this.followers,
    isFollow: userJWT ? userJWT.isFollowing(this._id) : false,
    valoration: valoration,
    karma: this.karma
  };
};

UserSchema.methods.toProfileJSONForFollow = function (user) {
  return {
    username: this.username,
    image: this.image || "bbyoda.png",
  };
};

module.exports = mongoose.model("User", UserSchema);
