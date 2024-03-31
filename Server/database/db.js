import mongoose from "mongoose";

const url = 'mongodb+srv://root:root@cluster0.nzl6jcw.mongodb.net/cinema?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log("Conexión exitosa a la base de datos");
});

export default db;
