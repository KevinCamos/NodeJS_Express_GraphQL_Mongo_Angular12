const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");

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
    default: true,
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
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  updateDate: {
    type: Date,
    default: Date.now(),
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
// ProductSchema.plugin(uniqueValidator, { message: "is already taken" });

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

ProductSchema.methods.update = function (product) {

  if (product.name && product.name != this.name) this.name = product.name;
  if (product.description && product.description != this.description)
    this.description = product.description;
  if (product.id_category && product.id_category != this.id_category)
    this.id_category = product.id_category;
  if (product.location && product.location != this.location)
    this.location = product.location;
  if (product.price && product.price != this.price) this.price = product.price;
  if (product.creationDate && product.creationDate != this.creationDate)
    this.creationDate = product.creationDate;
  if (product.updateDate && product.updateDate != this.updateDate)
    this.updateDate = product.updateDate;
  if (product.images && product.images != this.images)
    this.images = product.images;
    
  // this.name = product.name || this.name;
  // this.description = product.description || this.description;
  // this.id_category = product.id_category || this.id_category;
  // this.location = product.location || this.location;
  // this.price = product.price || this.price;
  // this.creationDate = product.creationDate || this.creationDate;
  // this.updateDate = product.updateDate || this.updateDate;
  // this.images = product.images || this.images;
  
  return ;
};

module.exports = mongoose.model("Product", ProductSchema);
