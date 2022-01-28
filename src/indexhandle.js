const express = require("express");
const { Router } = express;

const app = express();

const router = Router();

//Definición de ruta
app.use('/api/productos', router)

const { engine } = require ('express-handlebars');

app.engine('handlebars', engine({defaultLayout: 'index.handlebars'}));

app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))



var Contenedor = require('../api/Contenedor.js');

const productos = new Contenedor('./productos.txt');

router.get('/', async (req, res) => {    
    const prods = await productos.getAll()

    console.log(prods);
    res.render('vista', { product: prods, hayProductos: prods.length });
});


//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/', async (req, res) => {

    const {title, price, thumbnail} = req.body;

    const nuevoProducto = {
        title, 
        price,
        thumbnail
    }

    productos.save(nuevoProducto);

    //console.log(req.body)
    // res.json(nuevoProducto);
    res.redirect('/productos')
})

//listener server
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
