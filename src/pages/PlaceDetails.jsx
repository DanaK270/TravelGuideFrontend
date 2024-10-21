import { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'

const PlaceDetails = () => {
  const { id } = useParams()
  const [place, setPlace] = useState('')
  const [reviewData, setReviewData] = useState({ comment: '', score: 0 })

  const getPlace = async () => {
    try {
      const res = await Client.get(`/Place/${id}`)
      setPlace(res.data)
    } catch (err) {
      console.error('Error fetching place:', err)
    }
  }

  useEffect(() => {
    getPlace()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token') //to get the user
      const review = {
        comment: reviewData.comment,
        score: reviewData.score,
        place: id
      }

      await Client.post('/review/add', review, {
        headers: {
          //we need to add this header because it is a protected route
          Authorization: `Bearer ${token}`
        }
      })

      //get place again to get the updated data (with the newly added review!)
      getPlace()
      setReviewData({ comment: '', score: 0 })
    } catch (err) {
      console.error('Error submitting review:', err)
    }
  }

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value })
  }

  const img = `http://localhost:4000/images/${place.image}`

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '3%'
        }}
      >
        <div
          style={{
            margin: '3%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <h1 style={{ fontSize: '4rem' }}>{place.name}</h1>
          <br />
          <br />
          {
            <h2 style={{ fontSize: '2rem' }}>
              Located in {place.country?.name}
            </h2>
          }
          <br />
          <h3>{place.description}</h3>
          <br />
          <a
            target="_blank"
            href={place.link}
            style={{ textDecoration: 'none', color: 'white', fontSize: '2rem' }}
          >
            View Place's Website
          </a>
        </div>
        <div>
          <img src={img} alt="img" />
        </div>
      </div>

      <div style={{ marginTop: '5%' }}>
        <ul className="countries-list">
          <h2 style={{ marginLeft: '2%' }}>Reviews</h2>
          {place.reviews?.map((review) => (
            <li
              key={review.id}
              className="country-item"
              style={{
                margin: '10px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <h4>{review.comment} </h4>
              <h4>{review.score} / 5</h4>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '5%', padding: '1%' }}>
        <form onSubmit={handleSubmit}>
          <h3>Leave a Review</h3>
          <br />
          <div>
            <textarea
              name="comment"
              value={reviewData.comment}
              onChange={handleChange}
              required
              rows="3"
              style={{ width: '100%', marginBottom: '1rem' }}
              placeholder={`what do you think about ${place.name} ?`}
            />
          </div>
          <div>
            <label>Rate Your Experience at {place.name}!</label>
            <br />
            <input
              className="input"
              style={{ height: '30px', width: '200px' }}
              type="number"
              name="score"
              value={reviewData.score}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </div>
          <br />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </>
  )
}

export default PlaceDetails