import { useState } from 'react';
import axios from 'axios';

const FlightTracking = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFlightNumber(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/flight/track?flightNumber=${flightNumber}`);
      console.log('Frontend Flight Data:', response.data); // Log to inspect data

      const flight = response.data;
      if (flight) {
        setFlightData(flight);
        setError('');
      } else {
        setError('Flight not found');
      }
    } catch (err) {
      console.error('Error fetching flight data:', err);
      setError('Error fetching flight data');
    }
  };

  return (
    <section className="form-container">
      <h1>Flight Tracking</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Flight Number"
          value={flightNumber}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="primary__btn">
          Track Flight
        </button>
      </form>

      {error && <p className="error__msg">{error}</p>}

      {flightData && (
        <div className="flight-info">
          <h2>Flight Details</h2>
          <p><strong>Flight Number:</strong> {flightData?.flight?.iata || 'N/A'}</p>
          <p><strong>Airline:</strong> {flightData?.airline?.name || 'N/A'}</p>
          <p><strong>Status:</strong> {flightData?.flight_status || 'N/A'}</p>
          <p>
            <strong>Departure:</strong> {flightData?.departure?.airport || 'N/A'} at {flightData?.departure?.scheduled || 'N/A'}
          </p>
          <p>
            <strong>Arrival:</strong> {flightData?.arrival?.airport || 'N/A'} at {flightData?.arrival?.scheduled || 'N/A'}
          </p>
        </div>
      )}
    </section>
  );
};

export default FlightTracking;
