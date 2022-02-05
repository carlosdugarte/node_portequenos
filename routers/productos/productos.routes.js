const express = require('express');
const autorizadorMiddleware = require('../../middleware/autorizador/autorizador');
const router = express.Router();

const {
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} = require('../../controllers/productos.controller');

//ENDPOINTS
router.get('/:idProducto?', getProductsController);
router.post('/', autorizadorMiddleware, addProductController)
router.put('/:idProducto', updateProductController)
router.delete('/:idProducto', autorizadorMiddleware, deleteProductController)

module.exports = router;
