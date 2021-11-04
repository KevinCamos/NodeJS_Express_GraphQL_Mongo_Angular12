var mongoose = require("mongoose");
var Product = mongoose.model("Product");

const getAllProducts = () => Product.find({}).exec();

const getAProduct = (root, { slug }, context) => Product.findOne({ slug: slug }).exec();

const createNewProduct =async  (root, { product },context) => {
  console.log(root,product,context)

 let myproduct= new Product(product);
 await  myproduct.save();
 return myproduct
};

const resolvers= {
  Query: {
    products: getAllProducts,
    product: getAProduct,
  },
  Mutation: {
    addProduct: createNewProduct,
  },
};
module.exports= resolvers