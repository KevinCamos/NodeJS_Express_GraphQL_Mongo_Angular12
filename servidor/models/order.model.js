const mongoose = require("mongoose");
var Product = mongoose.model("Product");

const OrderSchema = mongoose.Schema({
  id_product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  id_user_seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  id_user_buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  total_price: { type: Number, required: true },
  valoration: {
    type: Number,
    required: false,
  },
  buy_date: {
    type: Date,
    default: Date.now(),
  },
});
OrderSchema.methods.createOrder = function (product, userBuyer) {
  console.log(product.author._id);
  if (userBuyer._id === product.author._id) {
    console.log("el mateix usuari");
    return new Error("he buys himself");
  }
  this.id_product = product._id;
  this.id_user_seller = product.author._id;
  this.id_user_buyer = userBuyer._id;
  this.total_price = product.price;
  product.status = false;

  console.log(this);

  product.save();
  return this.save();
};
OrderSchema.methods.toJSONfor = function (/* product, userBuyer */) {
  console.log("----------------------");
  console.log(this.toJSONForProduct(this.id_product));
  console.log("----------------------");
  return {
    id_product: this.toJSONForProduct(this.id_product),
    total_price: this.total_price,
    buy_date: this.buy_date,
    valoration: this.valoration? this.valoration:false,
  };
};

OrderSchema.methods.toJSONForProduct = function (product) {
  /*  console.log(user); */
  return {
    slug: product.slug,
    name: product.name,
    images: product.images,
    description: product.description,
    status: product.status,
    location: product.location,
    id_category: product.id_category,
    price: product.price,
    // creationDate: this.creationDate,
    // updateDate: this.updateDate,
  };
};
//https://mongoosejs.com/docs/middleware.html#pre schema.pre is a middleware function

//how to use slug https://www.npmjs.com/package/slug
//Math.random saca un número aleatorio entre 0 y como máximo el multiplicado-> math.pow("numero","numeroAlQueSeEleva") por lo tanto un número entre 0 y 2.176.782.336 a letra

module.exports = mongoose.model("Order", OrderSchema);
