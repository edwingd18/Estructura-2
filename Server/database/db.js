import mongoose from "mongoose";

const url =  'mongodb://localhost:27017/cinema'

mongoose.connect(url)

const db =  mongoose.connection
db.on('open', ()=> {console.log("conexion exitosa")})
db.on('error', ()=> {console.log("conexion fallida")})

export default db
