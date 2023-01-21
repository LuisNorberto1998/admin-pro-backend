const mongoose = require("mongoose");

const dbConnection = async () => {
    // mongodb+srv://db_norberto:norberto123@cluster0.rjhv6tz.mongodb.net/hospital
    try {
        await mongoose.connect(process.env.DB_CNN);

        // const options = { strict: 'throw', strictQuery: false };
        // const mySchema = new mongoose.Schema(options);

        console.log("DB ONLINE");
    } catch (error) {
        console.error(error);
        throw new Error("Error a la hora de iniciar la BD");
    }
};

module.exports = {
    dbConnection
}
