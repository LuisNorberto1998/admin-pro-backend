const Usuario = require('../models/usuario');

const getUsuarios = (request, response) => {
    response.json({
        ok: true,
        msg: "get Usuarios"
    });
};

const crearUsuario = async (request, response) => {

    const { email, password, nombre } = request.body;

    const usuario = new Usuario( request.body );

    await usuario.save();

    response.json({
        ok: true,
        usuario
    });
};




module.exports = {
    getUsuarios,
    crearUsuario
}