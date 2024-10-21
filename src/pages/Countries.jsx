// pages/Countries.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../services/api' // Adjust based on your setup

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCountries = async () => {
    try {
      const res = await Client.get('/country') // Fetch countries from backend
      setCountries(res.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching countries:', err)
      setError('Failed to fetch countries')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="countries-container">
      <h2 className="countries-title">Countries</h2>
      <ul className="countries-list">
        {countries.map((country) => (
          <li key={country.id} className="country-item">
            <Link to={`/countries/${country.id}`} className="country-link">
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Countries
