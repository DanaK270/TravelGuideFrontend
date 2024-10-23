import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const displayUsers = ({ user, setUser }) => {
  console.log(user.name)

  const navigate = useNavigate()
  const [profileData, setProfileData] = useState([
    {
      name: '',
      email: '',
      role: ''
    }
  ])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Profile/users`)
        setProfileData(response.data.user)
      } catch (err) {
        throw err
      }
    }
    fetchUserProfile()
  }, [])

  return profileData.map((users) => (
    <div key={users.id}>
      <div>
        <h3>name: </h3>
        {users.name}
      </div>
      <div>
        <h3>email: </h3>
        {users.email}
      </div>
      <div>
        <h3>role: </h3>
        {users.role}
      </div>
    </div>
  ))
}

export default displayUsers
