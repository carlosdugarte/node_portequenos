const express = require('express');

const router = express.Router();

const {
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController
} = require('../../controllers/productos.controller');

//ENDPOINTS
//GET '/api/productos/:id'      -> devuelve productos por su id.
//GET '/api/productos/          -> devuelve productos.
router.get('/:idProducto?', getProductsController);

//POST '/api/productos'         -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/', addProductController)

//PUT '/api/productos/:id'      -> recibe y actualiza un producto según su id.
router.put('/:idProducto', updateProductController)

//DELETE '/api/productos/:id'   -> elimina un producto según su id.
router.delete('/:idProducto', deleteProductController)


module.exports = router;