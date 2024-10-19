import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      home
      <Link to="/signin">sign in</Link>
      <Link to="/register">register</Link>
    </div>
  )
}
