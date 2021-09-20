var router = require("express").Router();
const products = require("./products");
const images = require("./images");
const categories = require("./categories");


/**
 *               
 * router.use("/ruta postman/", carpeta de uso de ); 
 */
router.use("/products/", products);  
router.use("/images/", images);  
router.use("/categories/", categories);  

module.exports = router;
