import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookHotel = ({ user }) => {
  const [hotelDetails, setHotelDetails] = useState({
    hotelName: '',
    location: '',
    checkInDate: '',
    checkOutDate: '',
    price: 0,
    paymentMethodId: '',
  });

  const [hotels, setHotels] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      const { hotelName, location, checkInDate, checkOutDate, price, paymentMethodId } = hotelDetails;

      const response = await axios.post('/api/hotels/book', {
        hotelName,
        location,
        user: user._id, // Assuming user object has an _id field
        date: { checkInDate, checkOutDate },
        price,
        paymentMethodId,
      });

      if (response.status === 201) {
        alert('Booking confirmed!');
        navigate('/my-bookings'); // Redirect to bookings page
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again later.');
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/api/hotels/search', {
          params: {
            location: 200, // Example: New York location ID
            checkin_date: '2024-11-01',
            checkout_date: '2024-11-05',
            guests: 2,
            rooms: 1,
          },
        });

        const data = response.data;

        if (Array.isArray(data)) {
          setHotels(data); // Set hotels if data is valid
        } else {
          setHotels([]); // Set as an empty array if no data
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Failed to fetch hotels. Please try again.');
      }
    };

    fetchHotels();
  }, []);

  return user ? (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2>Book a Hotel</h2>
      {error ? (
        <p>{error}</p> // Display error message if fetch fails
      ) : hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.hotel_id}>
              <h3>{hotel.hotel_name}</h3>
              <p>{hotel.address}</p>
              <p>Price: {hotel.min_total_price} USD</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels found.</p> // Handle case with no hotels
      )}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleChange} style={inputStyle} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} style={inputStyle} />
        <input type="date" name="checkInDate" onChange={handleChange} style={inputStyle} />
        <input type="date" name="checkOutDate" onChange={handleChange} style={inputStyle} />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} style={inputStyle} />
        <input type="text" name="paymentMethodId" placeholder="Payment Method ID" onChange={handleChange} style={inputStyle} />
      </form>
      <button onClick={handleBooking} style={buttonStyle}>Confirm Booking</button>
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
