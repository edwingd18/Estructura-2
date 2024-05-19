import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import MovieRoutes from './routes/routes.js';
import userRouter from "./routes/user.routes.js";
import paymentRouter from './routes/payment.routes.js';
import { Server as SocketServer } from "socket.io";
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const users = {}; // Objeto para almacenar los usuarios conectados

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Escuchar cuando un usuario se une
  socket.on('join', (userId) => {
    users[userId] = socket.id;
    console.log(`${userId} joined with socket ID ${socket.id}`);
  });

  // Escuchar eventos de "message" desde los clientes
  socket.on("message", (message) => {
    const { userId, text } = message;
    console.log(`Message from ${userId}: ${text}`);

    // Enviar mensaje al administrador
    if (users['admin']) {
      io.to(users['admin']).emit('message', { userId, text });
    }

    // Enviar mensaje al usuario
    if (users[userId]) {
      io.to(users[userId]).emit('message', { userId: 'admin', text });
    }
  });

  // Manejar la desconexión
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', MovieRoutes);
app.use('/api/user', userRouter);
app.use('/api/payment', paymentRouter);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server UP running in http://localhost:${PORT}`);
});
