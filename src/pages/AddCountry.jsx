import React, { useState } from 'react'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'

const AddCountry = ({ user }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: ''
    // flag:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // const handleFileChange = (e, file) => {
  //   setFormData({
  //     ...formData,
  //     image: file
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await Client.post('/country/', formData)
    console.log(result.data)
    navigate('/')
  }

  return user && user.role === 'admin' ? (
    <section className="form-container">
      <h1>Add Country</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Country Name"
          required
        />
        {/* <input
          className="input"
          type="text"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          placeholder="Continent"
          required
        /> */}
        <button type="submit" className="primary__btn">
          Add Country
        </button>
      </form>
    </section>
  ) : (
    <div>you are not allowed to access this page</div>
  )
}

export default AddCountry
