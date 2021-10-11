var router = require("express").Router();

const Carousel = require("../../models/carousel.model")



router.post("/", async (req, res) => {
    try {
      let carousel;
      carousel = new Carousel(req.body);
      await carousel.save();
      console.log(req.body)
      res.send(carousel);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  }) ;
  
  router.get("/", async (req, res) => {
    try {
      const carouselImages = await Carousel.find();
      res.json(carouselImages);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });
  
  
  router.delete('/:id',async (req, res) => {
    try {
      let carousel = await Carousel.findById(req.params.id);
      if (!carousel) {
        res.status(404).json({ msg: "No existe este carousel" });
      }
      await Carousel.findOneAndRemove({ _id: req.params.id });
      res.json({ msg: "carousel eliminado con éxito!" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  });



  module.exports = router;
