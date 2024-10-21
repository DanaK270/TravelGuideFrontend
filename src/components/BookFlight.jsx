import { useState } from 'react';
import axios from 'axios';

const BookFlight = () => {
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    date: '',
    price: 0,
  });

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/bookings/book-flight', {
      flightDetails,
      userId: localStorage.getItem('userId'),
      paymentInfo: {}, // Add Stripe payment info if needed
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="flightNumber"
        placeholder="Flight Number"
        value={flightDetails.flightNumber}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={flightDetails.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={flightDetails.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Book Flight</button>
    </form>
  );
};

export default BookFlight;
