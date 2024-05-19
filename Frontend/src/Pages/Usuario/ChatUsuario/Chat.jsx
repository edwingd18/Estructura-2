import React, { useState, useEffect } from 'react';
import socket from '../../../socket';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const userId = 'user1'; // Unique identifier for the user
    socket.emit('join', userId);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('message', { userId: 'user1', text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 rounded-lg shadow-md ${message.userId === 'admin' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
