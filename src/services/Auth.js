// services/Auth.js
import Client from './api';

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data);
    localStorage.setItem('token', res.data.token); // Save token to local storage
    return res.data.user;
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session');
    return res.data;
  } catch (error) {
    throw error;
  }
};
