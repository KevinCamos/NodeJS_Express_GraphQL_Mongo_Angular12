var mongoose = require("mongoose");
var Product = mongoose.model("Product");

const getAllProducts = () => Product.find({}).exec();

const getAProduct = (root, { slug },context) => {
  // console.log("context eh",context)
  console.log(context.user)
  if(context.user){
    console.log("entra")
  }
  return Product.findOne({ slug: slug }).exec();
};

const createNewProduct = async (root, { product }, context) => {
  console.log(root, product, context);

  if(context.user){

product.author= context.user._id
  let myproduct = new Product(product);
  await myproduct.save();
  return myproduct;
}


};

const resolvers = {
  Query: {
    products: getAllProducts,
    product: getAProduct,
  },
  Mutation: {
    addProduct: createNewProduct,
  },
};
module.exports = resolvers;
