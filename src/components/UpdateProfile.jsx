import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProfile = ({ user, setUser }) => {
  const { userId } = useParams()
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Profile/${userId}`
        )
        setProfileData(response.data.user)
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }
    fetchUserProfile()
  }, [userId])

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
        `http://localhost:4000/Profile/update/${userId}`,
        profileData
      )
      setUser(response.data.user)
      navigate(`/`)
    } catch (err) {
      console.error('Error updating profile:', err)
    }
  }

  return (
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
  )
}

export default UpdateProfile
