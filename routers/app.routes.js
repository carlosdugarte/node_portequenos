const express = require('express');


const  rutasProductos = require('./productos/productos.routes')

const router = express.Router();

//Definición de rutas
router.use('/productos', rutasProductos);

module.exports = router;
