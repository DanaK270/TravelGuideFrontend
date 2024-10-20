import React, { useState } from 'react';
import axios from 'axios';

const AddHotel = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/hotels', { name, location });
    setName('');
    setLocation('');
  };

  return (
    <section className="form-container">
      <h1>Add Hotel</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Hotel Name"
          required
        />
        <input
          className="input"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          required
        />
        <button type="submit" className="primary__btn">Add Hotel</button>
      </form>
    </section>
  );
};

export default AddHotel;
