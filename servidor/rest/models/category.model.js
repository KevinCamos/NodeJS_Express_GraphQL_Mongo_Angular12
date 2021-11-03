const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");


const CategorySchema = mongoose.Schema({
  slug: {
    type: String,
    lowecase: true,
    unique: true,
  },
  reference: {
    type: Number,
    required: true,
  },
  icon: {
    type: String
  },
  name_category: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

CategorySchema.plugin(uniqueValidator, { message: "is already taken" });

//https://mongoosejs.com/docs/middleware.html#pre schema.pre is a middleware function

CategorySchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify(); // ProductSchema.methods.slugify = function()
  }
  next();
});

//how to use slug https://www.npmjs.com/package/slug
//Math.random saca un número aleatorio entre 0 y como máximo el multiplicado-> math.pow("numero","numeroAlQueSeEleva") por lo tanto un número entre 0 y 2.176.782.336 a letra

CategorySchema.methods.slugify = function () {
  this.slug =
    slug(this.name_category);
};

CategorySchema.methods.toListJSONFor = function () {
  return {
    reference: this.reference,
    name_category: this.name_category,
    slug: this.slug,
    icon: this.icon
  };
};

module.exports = mongoose.model("Category", CategorySchema);
