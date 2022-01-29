const express = require('express');

const router = express.Router();

var Productos = require('../../api/Productos');

const productos = new Productos('./data/productos.txt');

//ENDPOINTS
router.get('/', async (req, res) => {    
    const prods = await productos.getAll();
    console.log(prods);
    res.render('vista', { product: prods, hayProductos: prods.length });
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get('/:idProducto', async (req, res) => {
    console.log(req.params)
    const id = req.params.idProducto;
    const prod =  await productos.getById(id);
    if(!prod) return res.status(400).json({error: `Producto con id ${id} no encontrado`})
    res.json(prod)
})

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/', async (req, res) => {

    console.log(req.body)

    const {title, price, thumbnail} = req.body;

    const nuevoProducto = {
        title, 
        price,
        thumbnail
    }

    productos.save(nuevoProducto);

    //console.log(req.body)
    // res.json(nuevoProducto);
    res.redirect('/api/productos')
})

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/:idProducto', async (req, res) => {

    const { idProducto } = req.params;
    const {title, price, thumbnail} = req.body;

    const productoActualizar = {
        title, 
        price, 
        thumbnail,
        idProducto
    }

    let actualizar = productos.update(productoActualizar);

    actualizar.then((data) => {
        res.json(productoActualizar)
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/:idProducto', async (req, res) => {
    console.log(req.params)

    const { idProducto } = req.params;

    let borrar = productos.deleteById(idProducto);

    borrar.then((data) => {
        res.json({mensaje: "producto eliminado"})
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
    
})


module.exports = router;