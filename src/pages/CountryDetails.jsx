import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CountryDetails = ({ user }) => {
  const { id } = useParams()

  // State for the country data and selected tab (hotels/places)
  const [country, setCountry] = useState({})
  const [selectedTab, setSelectedTab] = useState('hotels')

  let navigate = useNavigate()

  // Fetch country details based on the id from params
  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/country/${id}`)
        setCountry(response.data)
      } catch (error) {
        console.error('Error fetching country details:', error)
      }
    }

    getCountryDetails()
  }, [id])

  // Function to handle tab change
  const handleClick = (category) => {
    setSelectedTab(category)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/country/${id}`)
      navigate('/countries')
    } catch (error) {
      console.error('Error deleting country:', error)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h1 style={{ margin: '2rem' }}>Destination Details</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '20rem',
            marginBottom: '4rem'
          }}
        >
          <button
            style={{ width: '8rem', height: '3rem' }}
            onClick={() => handleClick('hotels')}
          >
            Hotels
          </button>
          <button
            style={{ width: '8rem', height: '3rem' }}
            onClick={() => handleClick('places')}
          >
            Places
          </button>
        </div>
        {/* Show Delete Button if user role is 'admin' */}
        {user?.role === 'admin' && (
          <button
            style={{
              padding: '1rem 2rem',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}
            onClick={handleDelete}
          >
            Delete Country
          </button>
        )}
        <h2 style={{ marginBottom: '5rem', marginTop: '2rem' }}>
          {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        </h2>

        <ul style={{ width: '100%' }}>
          {selectedTab === 'hotels' ? (
            country.hotels?.map((hotel) => {
              const img = `http://localhost:4000/images/${hotel.image}`

              return (
                <li
                  key={hotel._id}
                  style={{
                    marginBottom: '5rem',
                    display: 'flex',
                    justifyContent: 'space-around'
                  }}
                >
                  <div style={{ width: '500px' }}>
                    <h2>{hotel.name}</h2>
                    <br />
                    <Link
                      to={`../hotel-details/${hotel._id}`}
                      className="country-link"
                    >
                      {'view Hotel'}
                    </Link>
                  </div>
                  <img src={img} alt={hotel.name} width="500px" />
                </li>
              )
            })
          ) : selectedTab === 'places' ? (
            country.places?.map((place) => {
              const img = `http://localhost:4000/images/${place.image}`
              return (
                <li
                  key={place._id}
                  style={{
                    marginBottom: '5rem',
                    display: 'flex',
                    justifyContent: 'space-around'
                  }}
                >
                  <div style={{ width: '500px' }}>
                    <h2>{place.name}</h2>
                    <br />
                    <p>{place.description}</p>
                    <br />
                    <Link
                      to={`../place-details/${place._id}`}
                      className="country-link"
                    >
                      {'view Place'}
                    </Link>
                  </div>
                  <img src={img} alt={place.name} width="500px" />
                </li>
              )
            })
          ) : (
            <p>No {selectedTab} available</p>
          )}
        </ul>
      </div>
    </>
  )
}

export default CountryDetails
