import { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'

const HotelDetails = () => {
  const { id } = useParams()
  const [hotel, setHotel] = useState('')

  const getHotel = async () => {
    try {
      const res = await Client.get(`/Hotel/${id}`)
      setHotel(res.data)
    } catch (err) {
      console.error('Error fetching hotel:', err)
    }
  }

  useEffect(() => {
    getHotel()
  }, [])

  const img = `http://localhost:4000/images/${hotel.image}`
  console.log(hotel.reviews)

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
        </div>
        <div>
          <img src={img} alt="img" />
        </div>
      </div>

      <div style={{ marginTop: '5%' }}>
        <ul className="countries-list">
          <h2 style={{ marginLeft: '2%' }}>Reviews</h2>
          {hotel.reviews?.map((review) => (
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
    </>
  )
}

export default HotelDetails
