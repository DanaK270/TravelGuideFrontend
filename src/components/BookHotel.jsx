import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const BookHotel = ({ user }) => {
  const [hotelDetails, setHotelDetails] = useState({
    hotelName: '',
    location: '',
    date: '',
    price: 0
  })
  let navigate = useNavigate()

  const handleChange = (e) => {
    setHotelDetails({ ...hotelDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/api/bookings/book-hotel', {
      hotelDetails,
      userId: localStorage.getItem('userId'),
      paymentInfo: {}
    })
  }

  return user ? (
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
  ) : (
    <>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
    </>
  )
}

export default BookHotel
