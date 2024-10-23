import { useState, useEffect } from 'react';
import { io } from 'socket.io-client'; // Ensure correct import
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Ensure WebSocket is used
  reconnectionAttempts: 5, // Retry on disconnect
  timeout: 10000, // Connection timeout
});

const CommunityChat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Confirm connection
    socket.on('connect', () => {
      console.log('Connected to chat server.');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from chat server.');
    });

    // Fetch previous messages
    socket.on('previousMessages', (prevMessages) => {
      console.log('Previous messages:', prevMessages);
      setMessages(prevMessages);
    });

    // Listen for new messages
    socket.on('message', (newMessage) => {
      console.log('New message received:', newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('previousMessages');
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId || userId.length !== 24) {
      alert('Invalid user ID. Please log in again.');
      console.error('Invalid user ID. Found:', userId);
      return;
    }

    const msg = {
      content: message,
      user: userId,
      timestamp: new Date(),
    };

    socket.emit('message', msg, (ack) => {
      if (ack?.status === 'ok') {
        console.log('Message successfully sent.');
      } else {
        console.error('Message send failed:', ack);
        alert('Message could not be sent.');
      }
    });

    setMessage('');
  };

  return user ? (
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
  ) : (
    <>
      <h3>You must be signed in to chat.</h3>
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
    </>
  );
};

export default CommunityChat;
