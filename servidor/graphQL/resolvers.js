var mongoose = require("mongoose");
var Product = mongoose.model("Product");

const getAllProducts = () => Product.find({}).exec();

const getAProduct = (root, { slug }, context) => Product.findOne({ slug: slug }).exec();

const createNewProduct =async  (root, { product }) => {
  new Product(product);
 await  Product.save();
 return Product
};

module.exports = {
  Query: {
    products: getAllProducts,
    product: getAProduct,
  },
  Mutation: {
    addProduct: createNewProduct,
  },
};
// productsCount: Int!
// products: [Product]!
// product(slug: String!): Product
