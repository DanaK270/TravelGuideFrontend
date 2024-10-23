import { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const HotelDetails = ({ user }) => {
  const { id } = useParams()
  const [hotel, setHotel] = useState('')
  const [reviewData, setReviewData] = useState({ comment: '', score: 0 })

  let navigate = useNavigate()

  const getHotel = async () => {
    try {
      const res = await Client.get(`/Hotel/${id}`)
      setHotel(res.data)
    } catch (err) {
      console.error('Error fetching hotel:', err)
    }
  }

  const deleteRev = async (delId) => {
    try {
      await Client.delete(`/review/delete/${delId}`)
      getHotel()
    } catch (err) {
      console.error('Error deleteing review:', err)
    }
  }

  useEffect(() => {
    getHotel()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token') //to get the user
      const review = {
        comment: reviewData.comment,
        score: reviewData.score,
        hotel: id
      }

      await Client.post('/review/add', review, {
        headers: {
          //we need to add this header because it is a protected route
          Authorization: `Bearer ${token}`
        }
      })

      //get hotel again to get the updated data (with the newly added review!)
      getHotel()
      setReviewData({ comment: '', score: 0 })
    } catch (err) {
      console.error('Error submitting review:', err)
    }
  }

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value })
  }

  const img = `http://localhost:4000/images/${hotel.image}`

  const handleDelete = async () => {
    try {
      await Client.delete(`/hotel/${id}`)
      navigate('/')
    } catch (error) {
      console.error('Error deleting hotel:', error)
    }
  }

  const handleEdit = () => {
    navigate(`../edit-hotel/${id}`)
  }

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
          <h1 style={{ fontSize: '4rem' }}>{hotel.name}</h1>
          <br />
          <br />
          {
            <h2 style={{ fontSize: '2rem' }}>
              Located in {hotel.country?.name}
            </h2>
          }
          <br />
          <a
            target="_blank"
            href={hotel.link}
            style={{ textDecoration: 'none', color: 'white', fontSize: '2rem' }}
          >
            View Hotel's Website
          </a>
          {/* Show Delete Button if user role is 'admin' */}
          {user?.role === 'admin' && (
            <>
              <button
                style={{
                  padding: '1rem 2rem',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '2rem'
                }}
                onClick={handleDelete}
              >
                Delete Hotel
              </button>
              <button
                style={{
                  padding: '1rem 2rem',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '2rem'
                }}
                onClick={handleEdit}
              >
                Edit Hotel
              </button>
            </>
          )}
        </div>
        <div>
          <img src={img} alt="img" width="500px" />
        </div>
      </div>

      <div style={{ marginTop: '5%' }}>
        <ul className="countries-list">
          <h2 style={{ marginLeft: '2%' }}>Reviews</h2>
          {hotel.reviews?.map((review) => (
            <li
              key={review._id}
              className="country-item"
              style={{
                margin: '10px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h4>{review.comment} </h4>
              </div>

              <div>
                <h4>{review.score} / 5</h4>
                <button
                  onClick={() => {
                    deleteRev(review._id)
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {user && (
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
                placeholder={`what do you think about ${hotel.name} ?`}
              />
            </div>
            <div>
              <label>Rate Your Experience at {hotel.name}!</label>
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
      )}
    </>
  )
}

export default HotelDetails
