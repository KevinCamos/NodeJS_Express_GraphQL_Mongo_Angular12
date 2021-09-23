var router = require("express").Router();

const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
// const productModel = require("../../models/product.model");

router.post("/", async (req, res) => {
  try {
    let product;
    product = new Product(req.body);

    //La siguiente operación busca en la tabla 'categories' y le añade en ella el _id del producto, para su posterior poulate("products")
    const category = await Category.updateOne(
      { reference: product.id_category },
      { $push: { products: product._id } }
    );
    console.log(category);
   
    // Category.updateOne(
    //   { reference: product.id_category },
    //   { $push: { products: product._id } }
    // );

    await product.save(); //Almacena el producte
    console.log(req.body);
    res.send(product);
    //res.json({product:toJSONfor(param)}) -> preguntar en clase para qué sirve, y si hay que poner o no return
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    // const { name, id_category, location, price, id_user} = req.body;
    const { name, id_category, location, price } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }

    product.name = name;
    product.id_category = id_category;
    product.location = location;
    product.price = price;
    //Al modificar, que s'actualitze el Date.Now
    product.updateDate = Date.now();
    // product.id_user = id_user;  Quan hi hatja que ficar usuari, no es farà update sobre ell, sino s'anyadirà al "create", açò sols es una prova

    product = await Product.findOneAndUpdate({ _id: req.params.id }, product, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findOne({
      $or: [{ slug: req.params.id }, { _id: req.params.id }],
    }); //DONA error en l'altre parametre si també busca per '_id'
    // let product = await Product.findOne({ slug: req.params.id });
    console.log(product);

    if (!product) {
      // product = await Product.findById(req.params.id);
      // if (!product) res.status(404).json({ msg: "No existe el product" });
      res.status(404).json({ msg: "No existe el product" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }
    await Product.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Product eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

module.exports = router;
