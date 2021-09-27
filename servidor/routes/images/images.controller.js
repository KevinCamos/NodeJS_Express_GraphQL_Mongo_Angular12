var router = require("express").Router();

const Image = require("../../models/image.model")



router.post("/", async (req, res) => {
    try {
      let image;
      image = new Image(req.body);
      await image.save();
      console.log(req.body)
      res.send(image);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  }) ;
  
  router.get("/", async (req, res) => {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      let image = await Image.findById(req.params.id);
      if (!image) {
        res.status(404).json({ msg: "No existe la imagen" });
      }
      res.json(image);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });
  
  router.delete('/:id',async (req, res) => {
    try {
      let image = await Image.findById(req.params.id);
      if (!image) {
        res.status(404).json({ msg: "No existe la imagen" });
      }
      await Image.findOneAndRemove({ _id: req.params.id });
      res.json({ msg: "image eliminado con éxito!" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });



  module.exports = router;
