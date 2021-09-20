const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

//api/products
router.post('/', productController.createProduct); //postOne
router.get('/', productController.getProducts); //getMany
router.put('/:id', productController.updateProduct);//postOne
router.get('/:id', productController.getProduct);//getIbe
router.delete('/:id', productController.deleteProduct);//deleteOne

module.exports = router;