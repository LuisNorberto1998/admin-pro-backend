/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controllers');
const router = Router();


router.get( '/', getUsuarios);

router.post( '/', 
    [
        check('nombre', "El nombre es obligatorio").not().isEmpty(),
        check('password', "El password es obligatorio").not().isEmpty(),
        check('email', "El email es obligatorio").isEmail(),
        validarCampos
    ],
    crearUsuario);


module.exports = router;