import React from 'react';
import { FaGlobe, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section style={aboutContainerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <div style={contentContainerStyle}>
        <div style={iconContainerStyle}>
          <FaGlobe size={40} style={iconStyle} />
        </div>
        <p style={paragraphStyle}>
          Welcome to <strong>Travel Trove!</strong> We are passionate about helping you discover 
          the best travel experiences around the world. Whether you're a solo traveler or a group 
          adventurer, we believe every journey starts with a dream destination.
        </p>
        <div style={iconContainerStyle}>
          <FaMapMarkedAlt size={40} style={iconStyle} />
        </div>
        <p style={paragraphStyle}>
          Our mission is to provide a platform where travelers can share their experiences, 
          discover hidden gems, and explore new destinations that create unforgettable memories. 
        </p>
        <div style={iconContainerStyle}>
          <FaUsers size={40} style={iconStyle} />
        </div>
        <p style={paragraphStyle}>
          Join our community of travelers and embark on your next adventure with us. 
          Your journey awaits—let’s explore the world together!
        </p>
      </div>
    </section>
  );
};

// Styles
const aboutContainerStyle = {
  maxWidth: '800px',
  margin: 'auto',
  textAlign: 'center',
  marginTop: '50px',
  padding: '30px',
  backgroundColor: '#f0f4ff',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  fontSize: '36px',
  marginBottom: '25px',
  color: '#333',
};

const contentContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
};

const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#6C85F7',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
};

const iconStyle = {
  color: 'white',
};

const paragraphStyle = {
  fontSize: '18px',
  lineHeight: '1.8',
  color: '#555',
  marginBottom: '10px',
  maxWidth: '700px',
  textAlign: 'center',
};

export default AboutUs;
