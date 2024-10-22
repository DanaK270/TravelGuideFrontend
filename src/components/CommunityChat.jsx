import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend server

const CommunityChat = () => {
  const [message, setMessage] = useState(''); // Input message
  const [messages, setMessages] = useState([]); // List of chat messages

  // Load previous messages and listen for new ones
  useEffect(() => {
    socket.on('previousMessages', (prevMessages) => {
      console.log('Previous messages:', prevMessages);
      setMessages(prevMessages);
    });

    socket.on('message', (newMessage) => {
      console.log('New message received:', newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
      alert(err); // Display the error to the user
    });

    // Clean up listeners on component unmount
    return () => {
      socket.off('previousMessages');
      socket.off('message');
      socket.off('error');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevent page refresh

    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!userId || userId.length !== 24) {
      alert('Invalid user ID. Please log in again.');
      console.error('Invalid user ID. Found:', userId);
      return;
    }

    const msg = {
      content: message,
      user: userId,
      timestamp: new Date(), // Add timestamp to the message
    };

    socket.emit('message', msg, (ack) => {
      if (ack && ack.status === 'ok') {
        console.log('Message successfully saved.');
      } else {
        alert('Message could not be saved.');
        console.error('Server error:', ack);
      }
    });

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
              {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'No Date'}
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
