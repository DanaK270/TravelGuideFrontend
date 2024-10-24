import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const displayUsers = ({}) => {
  const [userData, SetUserData] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/Profile/users`)
        SetUserData(response.data)
      } catch (err) {
        throw err
      }
    }
    fetchUser()
  }, [])

  return (
    <div>
      {userData?.map((users) => (
        <div key={users._id}>
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
          <Link to={`/Profile/UpdateUsers/${users._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  )
}

export default displayUsers
