var router = require("express").Router();
const products = require("./products");
const images = require("./images");


/**
 *               
 * router.use("/ruta postman/", carpeta de uso de ); 
 */
router.use("/products/", products);  
router.use("/images/", images);  

module.exports = router;
