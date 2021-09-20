var router = require("express").Router();

const Category = require("../../models/category.model")



router.post("/", async (req, res) => {
    try {
      let category;
      category = new Category(req.body);
      await category.save();
      console.log(req.body)
      res.send(category);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  }) ;
  
  router.get("/", async (req, res) => {
    try {
      const categorys = await Category.find();
      res.json(categorys);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      let category = await Category.findById(req.params.id);
      if (!category) {
        res.status(404).json({ msg: "No existe la categoria" });
      }
      res.json(category);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });
  
  router.delete('/:id',async (req, res) => {
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
