const administrador = false;

const autorizadorMiddleware = (req, res) => {
    if(!administrador) return res.status(400).json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })
}

module.exports = autorizadorMiddleware;