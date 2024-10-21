import React, { useState, useEffect } from 'react'
import Client from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditPlace = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [placeData, setPlaceData] = useState({
    name: '',
    location: '',
    description: '',
    country: '',
    link: '',
    image: null
  })
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryResponse = await Client.get('/country')
        setCountries(countryResponse.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPlaceData({
      ...placeData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    setPlaceData({
      ...placeData,
      image: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', placeData.name)
    formData.append('location', placeData.location)
    formData.append('country', placeData.country)
    formData.append('link', placeData.link)
    formData.append('description', placeData.description)

    if (placeData.image) {
      formData.append('image', placeData.image)
    }

    try {
      const result = await Client.put(`/Place/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(result.data)
      navigate('/')
    } catch (error) {
      console.error('Error updating place:', error)
    }
  }

  return (
    <section className="form-container">
      <h1>Edit Place</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          value={placeData.name}
          onChange={handleChange}
          placeholder="Place Name"
          required
        />
        <input
          className="input"
          name="location"
          type="text"
          value={placeData.location}
          onChange={handleChange}
          placeholder="Place Location"
        />
        <input
          className="input"
          name="link"
          type="text"
          value={placeData.link}
          onChange={handleChange}
          placeholder="Place Website Link"
        />
        <input
          className="input"
          name="description"
          type="text"
          value={placeData.description}
          onChange={handleChange}
          placeholder="Place Description"
        />

        <select
          className="input"
          name="country"
          value={placeData.country}
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
          name="image"
          onChange={handleFileChange}
          type="file"
          accept="image/*"
        />

        <button type="submit" className="primary__btn">
          Update Place
        </button>
      </form>
    </section>
  )
}

export default EditPlace
