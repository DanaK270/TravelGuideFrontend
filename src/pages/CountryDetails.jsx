import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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
      <div>
        <h1>Destination Details</h1>
        <div>
          <button onClick={() => handleClick('hotels')}>Hotels</button>
          <button onClick={() => handleClick('places')}>Places</button>
        </div>
        <h2>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h2>

        <ul>
          {selectedTab === 'hotels' ? (
            country.hotels?.map((hotel) => (
              <li key={hotel._id}>
                <div>
                  <h3>Hotel: {hotel.name}</h3>
                  <img src={hotel.image} alt={hotel.name} />
                </div>
              </li>
            ))
          ) : selectedTab === 'places' ? (
            country.places?.map((place) => (
              <li key={place._id}>
                <div>
                  <h3>Place: {place.name}</h3>
                  <img src={place.image} alt={place.name} />
                  <p>Description: {place.description}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No {selectedTab} available</p>
          )}
        </ul>
      </div>
    </>
  )
}

export default CountryDetails
