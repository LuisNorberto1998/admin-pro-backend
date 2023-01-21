

const getUsuarios = (request, response) => {
    response.json({
        ok: true,
        usuarios: [
            {
                id: 123,
                nombre: "Norberto",
            },
        ],
    });
};


module.exports = {
    getUsuarios,
}