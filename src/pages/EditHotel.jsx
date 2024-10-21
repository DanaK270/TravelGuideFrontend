import React, { useState, useEffect } from 'react'
import Client from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditHotel = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [hotelData, setHotelData] = useState({
    name: '',
    location: '',
    country: '',
    link: '',
    image: null
  })
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const hotelResponse = await Client.get(`/Hotel/${id}`)
        console.log(hotelResponse.data)
        setHotelData({
          name: hotelResponse.data.name,
          location: hotelResponse.data.location,
          country: hotelResponse.data.country,
          link: hotelResponse.data.link,
          image: hotelResponse.data.image
        })
      } catch (error) {
        console.error('Error fetching hotel:', error)
      }
    }

    const fetchCountries = async () => {
      try {
        const countryResponse = await Client.get('/country')
        setCountries(countryResponse.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchHotel()
    fetchCountries()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setHotelData({
      ...hotelData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    setHotelData({
      ...hotelData,
      image: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', hotelData.name)
    formData.append('location', hotelData.location)
    formData.append('country', hotelData.country)
    formData.append('link', hotelData.link)

    if (hotelData.image) {
      formData.append('image', hotelData.image)
    }

    try {
      const result = await Client.put(`/Hotel/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log(result.data)
      navigate('/')
    } catch (error) {
      console.error('Error updating hotel:', error)
    }
  }

  return (
    <section className="form-container">
      <h1>Edit Hotel</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          value={hotelData.name}
          onChange={handleChange}
          placeholder="Hotel Name"
          required
        />
        {/* <input
          className="input"
          name="location"
          type="text"
          value={hotelData.location}
          onChange={handleChange}
          placeholder="Hotel Location"
        /> */}
        <input
          className="input"
          name="link"
          type="text"
          value={hotelData.link}
          onChange={handleChange}
          placeholder="Hotel Website Link"
        />

        <select
          className="input"
          name="country"
          value={hotelData.country._id}
          onChange={handleChange}
          required
        >
          <option value="">Select a Country</option>

          {countries?.map((country) => (
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
          Update Hotel
        </button>
      </form>
    </section>
  )
}

export default EditHotel
