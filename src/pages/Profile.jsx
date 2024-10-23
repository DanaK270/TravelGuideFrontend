import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = ({ user, setUser }) => {
  console.log(user.name)
  return (
    <div>
      <div>
        <div>
          <h3>name: </h3>
          {user.name}
        </div>
        <div>
          <h3>email: </h3>
          {user.email}
        </div>
        <div>
          <h3>role: </h3>
          {user.role}
        </div>
      </div>
    </div>
  )
}

export default Profile
