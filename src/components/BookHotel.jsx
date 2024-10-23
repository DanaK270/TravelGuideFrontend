import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookHotel = ({ user }) => {
  const [hotelDetails, setHotelDetails] = useState({
    hotelName: '',
    checkInDate: '',
    checkOutDate: '',
    price: 0,
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });
  };

  return user ? (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Book a Hotel</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleChange} style={inputStyle} />
        <input type="date" name="checkInDate" onChange={handleChange} style={inputStyle} />
        <input type="date" name="checkOutDate" onChange={handleChange} style={inputStyle} />
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

export default BookHotel;
