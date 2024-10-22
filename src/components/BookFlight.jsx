import { useState } from 'react'
import axios from 'axios'
// import StripeWrapper from './StripePayment'

const BookFlight = () => {
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: '',
    date: '',
    price: 0
  })

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

  return (
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
      {/* <StripeWrapper
        onPaymentSuccess={handlePaymentSuccess}
        price={flightDetails.price}
      /> */}
    </div>
  )
}

export default BookFlight
