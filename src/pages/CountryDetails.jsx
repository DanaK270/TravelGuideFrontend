import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CountryDetails = () => {
  const { id } = useParams()

  // State for the country data and selected tab (hotels/places)
  const [country, setCountry] = useState({})
  const [selectedTab, setSelectedTab] = useState('hotels')

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
        <h2 style={{ marginBottom: '2rem' }}>
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
                  <div>
                    <h2>{hotel.name}</h2>
                    <Link
                      to={`../hotel-details/${hotel._id}`}
                      className="country-link"
                    >
                      {'view Hotel'}
                    </Link>
                  </div>
                  <img src={img} alt={hotel.name} />
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
                  <div>
                    <h3>Place: {place.name}</h3>

                    <p>Description: {place.description}</p>
                    <Link
                      to={`../place-details/${place._id}`}
                      className="country-link"
                    >
                      {'view Place'}
                    </Link>
                  </div>
                  <img src={img} alt={place.name} />
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
