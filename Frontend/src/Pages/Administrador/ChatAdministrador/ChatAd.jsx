import React, { useState, useEffect } from 'react';
import socket from '../../../socket';

const ChatAd = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Track the current user the admin is chatting with
  const [users, setUsers] = useState([]); // Track users who have sent messages

  useEffect(() => {
    const adminId = 'admin';
    socket.emit('join', adminId);

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      // Add the user to the list if it's not already there
      if (message.userId !== 'admin' && !users.includes(message.userId)) {
        setUsers((prevUsers) => [...prevUsers, message.userId]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [users]);

  const sendMessage = () => {
    if (newMessage.trim() && currentUser) {
      socket.emit('message', { userId: currentUser, text: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex h-full">
        <div className="w-1/3 bg-gray-100 p-4 border-r overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Users</h2>
          <ul>
            {users.map((user, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer rounded-lg ${currentUser === user ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                onClick={() => setCurrentUser(user)}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.filter(message => message.userId === currentUser || message.userId === 'admin').map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg shadow-md max-w-xs break-words ${message.userId === 'admin' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}
            >
              {message.text}
              {message.userId !== 'admin' && <div className="text-sm text-gray-500">From: {message.userId}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex p-4 border-t border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder={currentUser ? `Message to ${currentUser}` : "Select a user to message"}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={!currentUser} // Disable input if no user is selected
        />
        <button
          className={`p-2 rounded-r-lg focus:outline-none ${currentUser ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          onClick={sendMessage}
          disabled={!currentUser} // Disable button if no user is selected
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAd;
