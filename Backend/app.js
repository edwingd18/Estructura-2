//appq.js
import express from "express"
import cors from 'cors'
//importamos la conexión a la DB
import db from "./database/db.js"

//importamos nuestro enrutador
import MovieRoutes from './routes/routes.js'
import PaymentRoutes from './routes/payment.routes.js'
import userRouter from "./routes/user.routes.js";

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use('/api/movies', MovieRoutes)


// Rutas
app.use('/movies', MovieRoutes)
app.use('/payment', PaymentRoutes)
app.use('/user', userRouter)

//Ruta de bienvenida
app.listen(process.env.PORT || 8000, () => {
    console.log('Server UP running in http://localhost:', process.env.PORT || 8000);
  });