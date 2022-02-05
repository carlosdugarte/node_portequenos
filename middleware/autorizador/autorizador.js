const administrador = true;

const autorizadorMiddleware = (req, res, next) => {
    (administrador) ? next() 
                  : res.status(401).json({
                       error: -1, 
                       descripcion: 'no tienes permisos para acceder a la ruta ' + req.baseUrl + ' con el metodo ' + req.method });
}

module.exports = autorizadorMiddleware;