import ChatAdmiModel from '../models/ChatAdmiModel.js';


const chatController = {
  // Obtener todos los chats
  getAllChats: async (req, res) => {
    try {
      const chats = await ChatAdmiModel.find();
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los chats', error });
    }
  },

  // Obtener un chat específico por ID
  getChatById: async (req, res) => {
    try {
      const chat = await ChatAdmiModel.findById(req.params.id);
      if (chat) {
        res.status(200).json(chat);
      } else {
        res.status(404).json({ message: 'Chat no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar el chat', error });
    }
  },

  // Crear un nuevo chat
  createChat: async (req, res) => {
    try {
      const newChat = new ChatAdmiModel({
        name: req.body.name,
        messages: []  // Inicialmente sin mensajes
      });
      const savedChat = await newChat.save();
      res.status(201).json(savedChat);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el chat', error });
    }
  },

  // Añadir un mensaje a un chat existente
  addMessageToChat: async (req, res) => {
    try {
      const { text, sender } = req.body;
      const chat = await ChatAdmiModel.findById(req.params.id);
      if (chat) {
        chat.messages.push({ text, sender, timestamp: new Date() });
        await chat.save();
        res.status(200).json(chat);
      } else {
        res.status(404).json({ message: 'Chat no encontrado para añadir mensaje' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al añadir mensaje al chat', error });
    }
  }
};

export default chatController;
