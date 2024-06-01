import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import MovieRoutes from './routes/routes.js'
import userRouter from "./routes/user.routes.js"
import paymentRouter from './routes/payment.routes.js'
import { createServer } from 'http';
import { Server } from 'socket.io';
import transactionRouter from './routes/transaction.routes.js'


const app = express()
const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*", // Permitir todos los orígenes
    methods: ["GET", "POST"] // Permitir métodos GET y POST
  }
});

// Middleware
app.use(cors())
app.use(cors({ origin: '*' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Rutas
app.use('/api', MovieRoutes)
app.use('/api/user', userRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/transaction', transactionRouter)

// // Ruta de bienvenida
// app.listen(process.env.PORT || 8000, () => {
//   console.log('Server UP running in http://localhost:', process.env.PORT || 8000);
// });

// Ruta de bienvenida
server.listen(process.env.PORT || 8000, () => {
  console.log('Server UP running in http://localhost:', process.env.PORT || 8000)
})