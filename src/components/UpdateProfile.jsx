import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = ({ user, setUser }) => {
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    id: user.id
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `http://localhost:4000/Profile/update/${profileData.id}`,
        profileData
      )
      setUser(response.data)
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
            value={profileData.name}
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
            value={profileData.email}
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
            value={profileData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  ) : null
}

export default UpdateProfile
