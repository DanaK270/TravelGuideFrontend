import React, { useState } from 'react';
import axios from 'axios';

const AddPlace = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/places', { name, country });
    setName('');
    setCountry('');
  };

  return (
    <section className="form-container">
      <h1>Add Place</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Place Name"
          required
        />
        <input
          className="input"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <button type="submit" className="primary__btn">Add Place</button>
      </form>
    </section>
  );
};

export default AddPlace;
