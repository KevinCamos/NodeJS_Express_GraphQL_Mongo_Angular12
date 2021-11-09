const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");
const User = require("./user.model");

// var mySchema = mongoose.Schema(/* put your schema definition here */);
// mySchema.plugin(uniqueValidator);  <- valida el esquema, per ejemplo si a "slug" decimos "lowercase", comprueba que es así, sino envía un mensaje de respuesta
//https://www.npmjs.com/package/mongoose-unique-validator

const ProductSchema = mongoose.Schema({
  slug: {
    type: String,
    lowecase: true,
    unique: true,
  },
  name: {
    type: String,
    lowecase: true,
    required: true,
  },
  description: {
    type: String,
    lowecase: true,
    default: "",
    maxLength: 300,
  },
  status: {
    type: Boolean,
    default: true, //true=>active, false=>sold
  },
  id_category: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    lowecase: true,

    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // view: {
  //   type: Number,
  //   default: 0,
  // },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },
  id_user: {
    type: String,
    default: "undefined",
  },
  images: {
    type: [String],
    required: false,
  },
  favorites: {
    type: Number,
    default: 0,
  },
  favorited: {
    type: Boolean,
    default: false,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

ProductSchema.plugin(uniqueValidator, { message: "is already taken" });

//https://mongoosejs.com/docs/middleware.html#pre schema.pre is a middleware function

ProductSchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify(); // ProductSchema.methods.slugify = function()
  }
  this.lowercase();
  next();
});

//how to use slug https://www.npmjs.com/package/slug
//Math.random saca un número aleatorio entre 0 y como máximo el multiplicado-> math.pow("numero","numeroAlQueSeEleva") por lo tanto un número entre 0 y 2.176.782.336 a letra

ProductSchema.methods.slugify = function () {
  this.slug =
    slug(this.name) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

ProductSchema.methods.lowercase = function () {
  this.name = this.name.toLowerCase();
  this.location = this.location.toLowerCase();
  this.description = this.description.toLowerCase();
};

ProductSchema.methods.favoriteCount = function () {
  var product = this;

  return User.countDocuments({ favorites: { $in: [product._id] } }).then(
    function (count) {
      product.favorites = count;
      return product.save();
    }
  );
};

// ProductSchema.methods.isFavorite = function (user, id) {
//   console.log(user, "eGHEH")
//   return user.some(function (favoriteId) {
//     return favoriteId.toString() === id.toString();
//   });
// };

ProductSchema.methods.toDetailsJSONFor = function (user) {
  /*  console.log(user); */
  return {
    slug: this.slug,
    name: this.name,
    images: this.images,
    description: this.description,
    status: this.status,
    location: this.location,
    id_category: this.id_category,
    price: this.price,
    view: this.view,
    favorites: this.favorites,
    favorited: user ? user.isFavorite(this._id) : false,
    creationDate: this.creationDate,
    updateDate: this.updateDate,
    author: this.author.username,
  };
};

ProductSchema.methods.toJSONFor = function (user) {
  /*  console.log(user); */
  return {
    slug: this.slug,
    name: this.name,
    images: this.images,
    description: this.description,
    status: this.status,
    location: this.location,
    id_category: this.id_category,
    price: this.price,
    view: this.view,
    favorites: this.favorites,
    favorited: user ? user.isFavorite(this._id) : false,
    creationDate: this.creationDate,
    updateDate: this.updateDate,
    /*     author: this.author.toProfileJSONFor(id_user) */
  };
};

ProductSchema.methods.toListJSONFor = function () {
  return {
    name: this.name,
  };
};

module.exports = mongoose.model("Product", ProductSchema);
