import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to backend server

const CommunityChat = () => {
  const [message, setMessage] = useState(''); // Input message
  const [messages, setMessages] = useState([]); // Chat messages

  useEffect(() => {
    // Listen for previous messages
    socket.on('previousMessages', (prevMessages) => {
      console.log('Previous messages:', prevMessages);
      setMessages(prevMessages);
    });

    // Listen for new messages
    socket.on('message', (newMessage) => {
      console.log('New message:', newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('previousMessages');
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevent page refresh

    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!userId || userId.length !== 24) {
      console.error('Invalid user ID. Please log in again.');
      return;
    }

    const msg = { content: message, user: userId, timestamp: new Date() };
    console.log('Sending message:', msg);

    socket.emit('message', msg); // Send message to backend
    setMessage(''); // Clear input field
  };

  return (
    <div className="chat-container">
      <h1>Community Chat</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>User {msg.user?.name || 'Guest'}:</strong> {msg.content}
            <span style={{ marginLeft: '10px', fontSize: '0.8em', color: 'gray' }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </p>
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
