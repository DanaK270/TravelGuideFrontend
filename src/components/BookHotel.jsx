import { useState } from 'react';
import axios from 'axios';

const BookHotel = () => {
  const [hotelDetails, setHotelDetails] = useState({
    hotelName: '',
    location: '',
    date: '',
    price: 0,
  });

  const handleChange = (e) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/bookings/book-hotel', {
      hotelDetails,
      userId: localStorage.getItem('userId'),
      paymentInfo: {},
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="hotelName"
        placeholder="Hotel Name"
        value={hotelDetails.hotelName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={hotelDetails.location}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={hotelDetails.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={hotelDetails.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Book Hotel</button>
    </form>
  );
};

export default BookHotel;
