const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");
var jwt = require("jsonwebtoken"); //npm install jsonwebtoken
var secret = require("../config").secret;

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

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image || "bbyoda.png",
  };
};

UserSchema.methods.toProfileJSONSimpleFor = function () {
  return {
    username: this.username,
    image: this.image || "bbyoda.png",
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

UserSchema.methods.toProfileJSONFollowers = function (users,valoration, user) {
  var followers = new Array();
  users.map((user, i) => (users[i] = user.toProfileJSONSimpleFor()));
  console.log(this.followers);
  this.followers.map(
    (follower, i) => (followers[i] = follower.toProfileJSONSimpleFor())
  );

  // console.log(users);
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || "bbyoda.png",
    favorites: this.favorites,
    following: users,
    followers: this.followers,
    isFollow: user ? user.isFollowing(this._id) : false,
    valoration:valoration
  };
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
  /*   console.log(userFollow);
  console.log(userFollow.followers.indexOf(this._id) === -1, 1); */
  if (userFollow.followers.indexOf(this._id) === -1) {
    userFollow.followers.push(this._id);
  }
  userFollow.save();
  /*   console.log(userFollow);
  console.log(this.following.indexOf(id) === -1, 1); */
  if (this.following.indexOf(id) === -1) {
    this.following.push(id);
  }
  return this.save();
};

UserSchema.methods.unfollow = function (id, userFollowed) {
  console.log(this.id);
  // console.log(userFollowed,"eh")
  userFollowed.followers.remove(this._id);
  // userFollowed.following.remove(id)
  userFollowed.save();
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function (id) {
  return this.following.some(function (followId) {
    return followId.toString() === id.toString();
  });
};

module.exports = mongoose.model("User", UserSchema);
