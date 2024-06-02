import  { useState } from 'react';

// Datos de ejemplo para los chats
const chatData = [
  { id: 1, name: 'Chat 1' },
  { id: 2, name: 'Chat 2' },
  { id: 3, name: 'Chat 3' },
  { id: 4, name: 'Chat 1' },
  { id: 5, name: 'Chat 2' },
  { id: 6, name: 'Chat 3' },
  { id: 7, name: 'Chat 1' },

];

const ChatList = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Chats</h3>
      <ul>
        {chatData.map((chat) => (
          <li
            key={chat.id}
            className="mb-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const MovieChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Aquí puedes agregar la lógica para enviar el mensaje al servidor
    }
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex w-[1000px] mx-4">
        <div className="w-64 mr-4">
          <ChatList />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 h-[600px] w-[1000px] flex flex-col overflow-y-auto">
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Chat de Cine</h2>
              <div className="flex items-center">
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>Nombre de Usuario</span>
              </div>
            </div>
            <div className="flex flex-col space-y-4 overflow-y-auto">
              <div className="bg-gray-200 rounded-lg p-2 self-start max-w-xs">
                <p className="text-sm">Mensaje de la otra persona</p>
              </div>
              <div className="bg-blue-500 text-white rounded-lg p-2 self-end max-w-xs">
                <p className="text-sm">Mi mensaje</p>
              </div>
              <div className="bg-gray-200 rounded-lg p-2 self-start max-w-xs">
                <p className="text-sm">Mensaje de la otra persona</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Escribe tu mensaje"
              className="border border-gray-300 rounded-l-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMessage}
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white rounded-r-lg px-4 py-2 focus:outline-none hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieChat;