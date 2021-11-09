var mongoose = require("mongoose");
var Product = mongoose.model("Product");

const getProducts = () => Product.find({}).exec();

const getProduct = (root, { slug }, context) => {
  return Product.findOne({ slug: slug }).exec();
};

const addProduct = async (root, { product }, context) => {
  console.log("-----------------------------------");
  console.log(root);
  console.log("-----------------------------------");
  console.log(product);
  console.log("-----------------------------------");
  console.log(context);
  console.log("-----------------------------------");


  if (context.user) {
    product.author = context.user._id;
    let myproduct = new Product(product);
    await myproduct.save();
    return myproduct;
  }
};

const updateProduct = (root, { product }, context) => {
  if (context.user) {
    return Product.findOne({ slug: product.slug })
      .then(function (putProduct) {
        if (!putProduct) return res.sendStatus(401);

        putProduct.update(product);
        putProduct.save();
        console.log(putProduct);
        return putProduct;
      })
      .catch(function (err) {
        // console.log(err)
      });
  }
};
const deleteProduct = (slug) => {
  return Product.deleteOne({ slug: slug }).then(function (prod) {
    console.log(prod.deletedCount);
    console.log("TRUE");
    return true;
  });
};

const searchDeleteProduct = (root, { slug }, context) => {
  return Product.findOne({ slug: slug, author: context.user._id })
    .then(function (putProduct) {
      console.log(putProduct)
      if (!putProduct) return res.sendStatus(401);
      //Si el producto no se ha vendido
      else if (putProduct.status === true) return deleteProduct(slug);
      else return false;
    })
    .catch(function (err) {
      return false;
      // console.log(err)
    });
};

const resolvers = {
  Query: {
    getProducts: getProducts,
    getProduct: getProduct,
  },
  Mutation: {
    addProduct: addProduct,
    updateProduct: updateProduct,
    deleteProduct: searchDeleteProduct,
  },
};
module.exports = resolvers;
