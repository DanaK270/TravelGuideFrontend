import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

const AddHotel = ({ user }) => {
  // const [name, setName] = useState('');
  // const [location, setLocation] = useState('');

  const navigate = useNavigate()
  const [countries, setCountries] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: '',
    reviews: [],
    image: null,
    link: ''
  })

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await Client.get('/country')
        setCountries(response.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e, file) => {
    setFormData({
      ...formData,
      image: file
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await Client.post('/Hotel/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log(result.data)
    navigate('/')
  }

  return user && user.role === 'admin' ? (
    <section className="form-container">
      <h1>Add Hotel</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Hotel Name"
          required
        />
        <select
          className="input"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          className="input"
          name="link"
          type="text"
          value={formData.link}
          onChange={handleChange}
          placeholder="Hotel Website Link"
          required
        />
        <input
          filename={formData.image}
          name="image"
          onChange={(e) => handleFileChange(e, e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>

        <button type="submit" className="primary__btn">
          Add Hotel
        </button>
      </form>
    </section>
  ) : (
    <div>you are not allowed to access this page</div>
  )
}

export default AddHotel
