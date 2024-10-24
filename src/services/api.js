import Axios from 'axios';

export const BASE_URL = 'http://localhost:4000'; // Ensure this matches your backend URL

const Client = Axios.create({ baseURL: BASE_URL });

// Intercepts every request Axios makes to attach the token
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Reads the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attaches token to headers
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle any errors with the request config
);

export default Client;
