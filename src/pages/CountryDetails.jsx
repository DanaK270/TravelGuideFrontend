`import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = () => {
  const [countries, setCountries] = useState([])
  const [countryCategory, setItemCategory] = useState('hotels')

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/${countryCategory}`
        )
        setCountries(response.data)
      } catch (error) {
        console.error('Error fetching Countries:', error)
      }
    }

    getCountries()
  }, [countryCategory])

  const handleClick = (category) => {
    setItemCategory(category)
  }

  return (
    <>
      <div>
        <h1>Country Details</h1>
        <div>
          <button onClick={() => handleClick('hotels')}>Hotels</button>
          <button onClick={() => handleClick('places')}>Places</button>
        </div>
        <h2>
          {countryCategory.charAt(0).toUpperCase() + countryCategory.slice(1)}
        </h2>
        <ul>
          {countries.map((country) => (
            <li key={country._id}>
              <div>
                <h3>Country: {country.name}</h3>
                {countryCategory === 'hotels' && (
                  <>
                    <img src={country.image} alt={country.name} />
                    <p>Continent: {country.continent?.name}</p>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default CountryDetails
`