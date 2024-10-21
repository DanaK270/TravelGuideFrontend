import React, { useState } from 'react';
import axios from 'axios';
import Client from '../services/api'; // Assuming you have an API service setup

const AddCountry = () => {
  const [id, setId] = useState(null); // State for country ID (for updating)
  const [name, setName] = useState('');
  const [continent, setContinent] = useState('');
  const [countryFlag, setCountryFlag] = useState(null); // State for the file

  // Handle file change
  const handleFileChange = (e) => {
    setCountryFlag(e.target.files[0]); // Store the selected file
  };

  // Function to add or update country
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('continent', continent);
    if (countryFlag) formData.append('image', countryFlag); // Attach the file if present

    try {
      if (id) {
        // If ID exists, update the country
        await Client.put(`/country/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Country updated successfully');
      } else {
        // If no ID, add a new country
        await Client.post('/country/addCountry', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Country added successfully');
      }

      // Clear the form fields after submission
      setId(null);
      setName('');
      setContinent('');
      setCountryFlag(null);
    } catch (error) {
      console.error('Error adding/updating country:', error);
    }
  };

  return (
    <section className="form-container">
      <h1>{id ? 'Update Country' : 'Add Country'}</h1>
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
            name="image"
            onChange={handleFileChange}
            type="file"
            accept="image/*"
          />
        </div>
        <button type="submit" className="primary__btn">
          {id ? 'Update Country' : 'Add Country'}
        </button>
      </form>
    </section>
  );
};

export default AddCountry;
