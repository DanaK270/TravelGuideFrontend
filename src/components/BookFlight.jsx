import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookFlight = ({ user }) => {
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    date: '',
    price: 0,
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  return user ? (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Book a Flight</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" name="flightNumber" placeholder="Flight Number" onChange={handleChange} style={inputStyle} />
        <input type="date" name="date" onChange={handleChange} style={inputStyle} />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} style={inputStyle} />
      </form>
      <button style={buttonStyle}>Confirm Booking</button>
    </div>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')} style={buttonStyle}>
        Sign In
      </button>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  borderRadius: '25px',
  backgroundColor: '#6C85F7',
  color: 'black',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

export default BookFlight;
