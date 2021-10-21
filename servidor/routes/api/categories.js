var router = require("express").Router();

const Category = require("../../models/category.model");

/* CREAR UNA CATEGORIA */
router.post("/", async (req, res) => {
  try {
    let category;
    category = new Category(req.body);
    await category.save();
    //console.log(req.body);
    res.send(category);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/* CATEGORIAS */
router.get("/", async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const categorys = await Category.find(
      {},
      {},
      { skip: Number(offset), limit: Number(limit) }
    );
    res.json(categorys);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/* LISTAR CATEGORIAS PARA FILTERS */
router.get("/list-categories", async (req, res) => {
  try {
    const categorys = await Category.find({});

    if (!categorys) {
      res.status(404).json({ msg: "No existen categorías" });
    }
    res.json(categorys.map((category) => category.toListJSONFor()));
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en /list-categories");
  }
});

/* OBTENER PRODUCTOS DE UNA CATEGORIA */
router.get("/:id", async (req, res) => {
  try {
    // let category = await Category.findOne({name_category:req.params.name}).populate('products');
    let category = await Category.findOne({ slug: req.params.id }).populate(
      "products"
    );
    if (!category) {
      res.status(404).json({ msg: "No existe la categoria" });
    }
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/* ELIMINAR CATEGORIA */
router.delete("/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ msg: "No existe la categoria" });
    }
    await Category.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "categoria eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

module.exports = router;
