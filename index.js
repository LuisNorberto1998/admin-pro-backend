require('dotenv').config();

const express = require('express');
const cors = require('cors')
const  { dbConnection } =  require('./database/config');

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// DB
dbConnection();

// console.log(process.env);

// Rutas
app.get( '/', (request, response) => {

    response.json({
        ok: true,
        msg: "Hola mundo"
    })

});

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en puerto", 3000);
})