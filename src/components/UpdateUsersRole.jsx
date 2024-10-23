import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const UpdateUsersRole = () => {
  const { userId } = useParams()
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Profile/${userId}`
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
      setUser(response.data.user)
      navigate(`/`)
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  return user ? (
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