import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the backend Socket.IO server

const CommunityChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on('message', (newMessage) => setMessages((prev) => [...prev, newMessage]));
    return () => socket.off('message'); // Clean up on unmount
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage
    socket.emit('message', { content: message, userId }); // Send message to the server
    setMessage(''); // Clear input field
  };

  return (
    <div className="chat-container">
      <h1>Community Chat</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}><strong>User {msg.user}:</strong> {msg.content}</p>
        ))}
      </div>
      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default CommunityChat;
