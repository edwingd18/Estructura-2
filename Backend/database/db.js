import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Obtener el nombre de usuario y la contraseña de las variables de entorno
const { MONGODB_USER, MONGODB_PASS } = process.env;

// Construir la URI de conexión utilizando las variables de entorno
const url = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.nzl6jcw.mongodb.net/cinema?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
    console.log("Conexión exitosa a la base de datos");
});

export default db;
