import { useState } from 'react';
import { SignInUser } from '../services/Auth';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await SignInUser(formValues);

      setFormValues({ email: '', password: '' });
      setUser(user);

      localStorage.setItem('userId', user.id);
      console.log('Login successful. User ID and tokens stored.');

      navigate('/community-chat');
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMessage('Wrong credentials, sign in failed!');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="example@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <button disabled={!formValues.email || !formValues.password}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
