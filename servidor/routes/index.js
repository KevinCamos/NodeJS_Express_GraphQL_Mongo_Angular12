var router = require("express").Router();
const products = require("./products/products.controller");
const images = require("./images/images.controller");
const categories = require("./categories/categories.controller");
const carousel = require("./carousel/carousel.controller");


/**
 *               
 * router.use("/ruta postman/", carpeta de uso de ); 
 */
router.use("/products/", products);  
router.use("/images/", images);  
router.use("/categories/", categories);  
router.use("/carousel/", carousel);  

module.exports = router;
