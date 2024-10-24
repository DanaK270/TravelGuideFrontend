import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateUsersRole = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Profile/UpdateUsers/${userId}`
        )
        setUserData(response.data.user)
      } catch (err) {
        setError('Error fetching user data')
        console.error(err)
      }
    }
    fetchUser()
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:4000/Profile/UpdateUsers/${userId}`,
        userData
      )
      setUserData(response.data.user)
      navigate(`/`)
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  return userData ? (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  ) : null
}

export default UpdateUsersRole
