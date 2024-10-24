import { useState } from 'react';
import { RegisterUser } from '../services/Auth'; // Import RegisterUser service
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
  const navigate = useNavigate();
  const initState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role is 'user'
  };
  const [formValues, setFormValues] = useState(initState);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Call the registration service
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        role: formValues.role,
      });

      // Clear the form and navigate to sign-in page
      setFormValues(initState);
      navigate('/sign-in');
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(
        err.msg || 'Registration failed! Please try again with different credentials.'
      );
    }
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Create Account</h2>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Smith"
              value={formValues.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              value={formValues.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword
            }
            style={{
              ...buttonStyle,
              opacity:
                !formValues.email ||
                !formValues.password ||
                formValues.password !== formValues.confirmPassword
                  ? 0.6
                  : 1,
              cursor:
                !formValues.email ||
                !formValues.password ||
                formValues.password !== formValues.confirmPassword
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  backgroundColor: '#f0f4ff',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const formContainerStyle = {
  width: '400px',
  padding: '30px',
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '28px',
  marginBottom: '20px',
  color: '#333',
};

const errorStyle = {
  color: 'red',
  marginBottom: '15px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '5px',
};

const labelStyle = {
  fontSize: '16px',
  color: '#555',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  borderRadius: '25px',
  backgroundColor: '#6C85F7',
  color: 'white',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default Register;
