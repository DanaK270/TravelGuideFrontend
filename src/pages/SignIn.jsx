import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const initState = { email: '', password: '' }
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await SignInUser(formValues)
      setFormValues(initState)
      setUser(payload)
      navigate('/')
    } catch (err) {
      setErrorMessage('wrong credintilas, sign in falied!')
    }
  }

  return (
    <div>
      <div>
        <h2>Sign In</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
