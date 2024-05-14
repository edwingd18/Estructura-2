import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import MovieRoutes from './routes/routes.js'
import userRouter from "./routes/user.routes.js"
import paymentRouter from './routes/payment.routes.js'
import chatRoutes from './routes/chat.routes.js'
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas

app.use('/api', MovieRoutes)
app.use('/api/user', userRouter)
app.use('/api/payment', paymentRouter)
app.use('/api', chatRoutes)


// Ruta de bienvenida
app.listen(process.env.PORT || 8000, () => {
  console.log('Server UP running in http://localhost:', process.env.PORT || 8000);
});