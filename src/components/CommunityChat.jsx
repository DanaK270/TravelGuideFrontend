import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to backend server

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

  // Check and log the userId on page load
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log('Retrieved userId from localStorage:', storedUserId);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevent page refresh

    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
    console.log('Retrieved userId:', userId); // Log the retrieved userId

    // Validate the userId to ensure it's valid
    if (!userId || userId.length !== 24) {
      alert('Invalid user ID. Please log in again.');
      console.error('Invalid user ID. Found:', userId); // Log for debugging
      return; // Stop if the userId is invalid
    }

    const msg = {
      content: message,
      user: userId,
      timestamp: new Date(), // Add timestamp to the message
    };
    console.log('Sending message:', msg); // Log the message before sending

    socket.emit('message', msg); // Send the message to the server
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
