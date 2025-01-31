import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI!);

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas básicas (exemplo)
app.get('/', (req, res) => {
  res.send('Backend do Dating App');
});

// Inicialização do servidor
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io para chat em tempo real
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('Usuário conectado ao chat:', socket.id);
});

io.on('connection', (socket) => {
  socket.on('send_message', (message) => {
    // Salvar mensagem no banco de dados
    io.to(message.room).emit('receive_message', message);
  });

  socket.on('join_room', (room) => {
    socket.join(room);
  });
});