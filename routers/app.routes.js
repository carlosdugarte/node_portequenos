const express = require('express');
const  rutasProductos = require('./productos/productos.routes')
const rutasCarrito = require('./carrito/carrito.routes')

const router = express.Router();

//Definición de rutas
router.use('/productos', rutasProductos);
router.use('/carrito', rutasCarrito);



module.exports = router;
