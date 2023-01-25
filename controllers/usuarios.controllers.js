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

module.exports = {
    getUsuarios,
    crearUsuario,
};
