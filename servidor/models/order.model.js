const mongoose = require("mongoose");

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
OrderSchema.methods.toJSONfor = function (product, userBuyer) {
  return {
    id_product: product.toJSONfor(),
    // id_product: this.id_product.toJSONfor(product)

    id_user_seller: this.id_user_seller,
    id_user_buyer: id_user_buyer.toProfileJSONSimpleFor(),
    // id_user_buyer: this.id_user_buyer.toJSONfor(userBuyer)

    total_price: this.total_price,
    buy_date: this.buy_date,
  };
};

//https://mongoosejs.com/docs/middleware.html#pre schema.pre is a middleware function

//how to use slug https://www.npmjs.com/package/slug
//Math.random saca un número aleatorio entre 0 y como máximo el multiplicado-> math.pow("numero","numeroAlQueSeEleva") por lo tanto un número entre 0 y 2.176.782.336 a letra

module.exports = mongoose.model("Order", OrderSchema);
