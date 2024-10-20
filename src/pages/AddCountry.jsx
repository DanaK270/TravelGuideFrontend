import React, { useState } from 'react'
import axios from 'axios'
import Client from '../services/api'
// const upload = multer()

const AddCountry = () => {
  const [name, setName] = useState('')
  const [continent, setContinent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.post('/country/addCountry', { name, continent })
    setName('')
    setContinent('')
  }

  return (
    <section className="form-container">
      <h1>Add Country</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Country Name"
          required
        />
        <input
          className="input"
          type="text"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          placeholder="Continent"
          required
        />
         <div>
          <label>Country Flag</label>
          <input
            filename={countryData.image}
            name="image"
            onChange={(e) => handleFileChange(e, e.target.files[0])}
            type="file"
            accept="image/*"
          ></input>
        </div>
        <button type="submit" className="primary__btn">
          Add Country
        </button>
      </form>
    </section>
  )
}

export default AddCountry
