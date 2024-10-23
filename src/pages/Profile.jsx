import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = ({ user, setUser }) => {
  console.log(user.name)

  const navigate = useNavigate()
  const { userId } = useParams() // Get the user ID from the URL
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    role: ''
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Profile/${userId}`
        )
        setProfileData(response.data.user)
      } catch (err) {
        throw err
      }
    }
    fetchUserProfile()
  }, [userId])

  return (
    <div>
      <div>
        <div>
          <h3>name: </h3>
          {profileData.name}
        </div>
        <div>
          <h3>email: </h3>
          {profileData.email}
        </div>
        <div>
          <h3>role: </h3>
          {profileData.role}
        </div>
      </div>
    </div>
  )
}

export default Profile
