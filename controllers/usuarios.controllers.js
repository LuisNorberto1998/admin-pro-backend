const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsuarios = async (request, res) => {
    const usuarios = await Usuario.find({}, "nombre email google role");

    res.json({
        ok: true,
        usuarios,
    });
};

const crearUsuario = async (request, res) => {
    const { email, password, nombre } = request.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(request.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar
        await usuario.save();

        res.json({
            ok: true,
            usuario,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const actualizarUsuario = async (req, res = response) => {
    
    // TODO: Validar TOKEN y validar si es el usuario correcto
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese id"
            });
        }

        const campos = req.body;

        console.log(usuarioDB);
        console.log(req.body);
        
        if (usuarioDB.email === req.body.email) {
            delete campos.email;    
        } else {

        }

        delete campos.password;        
        delete campos.google;
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos);

        res.json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
};
