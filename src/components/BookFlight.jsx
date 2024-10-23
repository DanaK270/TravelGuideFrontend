import { useState } from 'react'
import axios from 'axios'
// import StripeWrapper from './StripePayment'
import { useNavigate } from 'react-router-dom'

const BookFlight = ({ user }) => {
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    date: '',
    price: 0
  })

  let navigate = useNavigate()

  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, [e.target.name]: e.target.value })
  }

  const handlePaymentSuccess = async (paymentMethodId) => {
    await axios.post('/api/bookings/book-flight', {
      ...flightDetails,
      user: localStorage.getItem('userId'),
      paymentMethodId
    })
    alert('Flight booked successfully!')
  }

  return user ? (
    <div>
      <form>
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          onChange={handleChange}
        />
        <input type="date" name="date" onChange={handleChange} />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />
      </form>
      {/* <StripeWrapper onPaymentSuccess={handlePaymentSuccess} price={flightDetails.price} /> */}
    </div>
  ) : (
    <>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
    </>
  )
}

export default BookFlight
