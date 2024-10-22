// import { useState } from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements
// } from '@stripe/react-stripe-js'

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

// const StripePayment = ({ onPaymentSuccess, price }) => {
//   const stripe = useStripe()
//   const elements = useElements()
//   const [error, setError] = useState('')
//   const [processing, setProcessing] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setProcessing(true)

//     const card = elements.getElement(CardElement)
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card
//     })

//     if (error) {
//       setError(error.message)
//       setProcessing(false)
//     } else {
//       onPaymentSuccess(paymentMethod.id)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <p className="error__msg">{error}</p>}
//       <button type="submit" disabled={!stripe || processing}>
//         {processing ? 'Processing...' : `Pay $${price}`}
//       </button>
//     </form>
//   )
// }

// const StripeWrapper = ({ onPaymentSuccess, price }) => (
//   <Elements stripe={stripePromise}>
//     <StripePayment onPaymentSuccess={onPaymentSuccess} price={price} />
//   </Elements>
// )

// export default StripeWrapper
