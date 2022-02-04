var Productos = require('../models/Productos');

const productos = new Productos('./data/productos.txt');

const administrador = true;

const getProductsController = async (req, res) => {
    let response;
    const id = req.params.idProducto;
    if (id) {
        response = await productos.getById(id);
    } else {
        response = await productos.getAll();
    }

    if(!response) return res.status(400).json({error: `Producto con id ${id} no encontrado`})
    if(!administrador) return res.status(400).json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    return res.json(response);
};

const addProductController = async (req, res) =>{

    if(!administrador) return res.status(400).json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    const {nombre, descripcion, codigo, foto, precio} = req.body;
    const timestamp = Date.now();
    const stock = 1000;

    const nuevoProducto = {
        timestamp,
        nombre, 
        descripcion, 
        codigo, 
        foto, 
        precio, 
        stock
    }

    let guardar = productos.save(nuevoProducto);

    guardar.then((data) => {
        //res.redirect('/api/productos')
        res.json(nuevoProducto)
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
}

const updateProductController = async (req, res) => {

    if(!administrador) return res.status(400).json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    const { idProducto } = req.params;
    const {nombre, descripcion, codigo, foto, precio} = req.body;

    const productoActualizar = {
        nombre, 
        descripcion, 
        codigo, 
        foto, 
        precio,
        idProducto
    }

    let actualizar = productos.update(productoActualizar);

    actualizar.then((data) => {
        res.json(productoActualizar)
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })

}

const deleteProductController = async (req, res) => {

    if(!administrador) return res.status(400).json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })

    const { idProducto } = req.params;

    let borrar = productos.deleteById(idProducto);

    borrar.then(() => {
        res.json({mensaje: "producto eliminado"})
    })
    .catch((err) => {
        return res.status(400).json({error: `${err}`})
    })
}


module.exports = {
    productos,
    getProductsController,
    addProductController,
    updateProductController,
    deleteProductController,
    administrador
}
