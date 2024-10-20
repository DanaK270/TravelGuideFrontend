import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

const AddPlace = () => {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    country: '',
    description: '',
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
    const result = await Client.post('/Place/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log(result.data)
    navigate('/')
  }

  return (
    <section className="form-container">
      <h1>Add Place</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Place Name"
          required
        />
        <input
          className="input"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          placeholder="Place Description"
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
          placeholder="Place Website Link"
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
          Add Place
        </button>
      </form>
    </section>
  )
}

export default AddPlace
