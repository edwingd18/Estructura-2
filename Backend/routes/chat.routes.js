import express from 'express';
import chatController from '../controllers/ChatAdmiController.js';

const router = express.Router();

router.get('/chats', chatController.getAllChats);
router.get('/chats/:id', chatController.getChatById);
router.post('/chats', chatController.createChat);
router.post('/chats/:id/messages', chatController.addMessageToChat);

export default router;
