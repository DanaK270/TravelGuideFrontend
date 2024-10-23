import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

const displayUsers = ({}) => {
  const [userData, SetUserData] = useState([
    {
      name: '',
      email: '',
      role: '',
      id: ''
    }
  ])

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

  // const handleEdit = (e) => {
  //   navigate(`/Profile/updateusers/${key}`)
  // }

  return (
    <div>
      {userData?.map((users) => (
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
          <Link to={`/Profile/UpdateUsers/${users.id}`}>Edit</Link>
          {/* <button onClick={() => handleEdit({users.id})}>Edit</button> */}
        </div>
      ))}
    </div>
  )
}

export default displayUsers
