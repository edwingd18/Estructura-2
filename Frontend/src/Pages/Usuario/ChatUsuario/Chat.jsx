import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const MovieChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const isAdmin = window.localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    const newSocket = socketIOClient('http://localhost:8000');
    setSocket(newSocket);

    newSocket.on('chat message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => newSocket.close();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('chat message', { text: newMessage, sender: isAdmin ? 'admin' : 'user' });
      setNewMessage('');
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 h-[600px] w-[1000px] mx-4 flex flex-col">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Chat</h2>
            <div className="flex items-center">
              <img src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png" alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
              <span>Administrador</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.sender === 'admin'
                    ? (isAdmin ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start')
                    : (isAdmin ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end')
                } rounded-lg p-2 max-w-xs`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <input
            type="text"
            placeholder="Escribe tu mensaje"
            className="border border-gray-300 rounded-l-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-lg px-4 py-2 focus:outline-none hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieChat;