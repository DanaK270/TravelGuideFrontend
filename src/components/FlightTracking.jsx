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
      const response = await axios.get(
        `http://api.aviationstack.com/v1/flights?access_key=${process.env.REACT_APP_AVIATION_STACK_API_KEY}&flight_iata=${flightNumber}`
      );
      const flight = response.data.data[0];
      if (flight) {
        setFlightData(flight);
        setError('');
      } else {
        setError('Flight not found');
      }
    } catch (err) {
      console.error(err);
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
          <p><strong>Flight Number:</strong> {flightData.flight.iata}</p>
          <p><strong>Airline:</strong> {flightData.airline.name}</p>
          <p><strong>Status:</strong> {flightData.flight_status}</p>
          <p><strong>Departure:</strong> {flightData.departure.airport} at {flightData.departure.scheduled}</p>
          <p><strong>Arrival:</strong> {flightData.arrival.airport} at {flightData.arrival.scheduled}</p>
        </div>
      )}
    </section>
  );
};

export default FlightTracking;
