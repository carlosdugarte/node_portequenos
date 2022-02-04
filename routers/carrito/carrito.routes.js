const express = require('express');

const router = express.Router();

const {
    cart,
    createCartController,
    deleteCartController,
    getCartController,
    addProductController,
    removeProductController
} = require('../../controllers/carrito.controller');

//ENDPOINTS
router.post('/', createCartController);
router.delete('/:id', deleteCartController);
router.get('/:id/productos', getCartController);
router.post('/:id/productos', addProductController);
router.delete('/:id/productos/:id_prod', removeProductController);

module.exports = router;