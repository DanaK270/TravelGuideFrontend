import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

const Nav = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const currentMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(currentMode)
    document.body.classList.toggle('dark-mode', currentMode)
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.body.classList.toggle('dark-mode', newMode)
    localStorage.setItem('darkMode', newMode)
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img
            src=""
            alt="Travel trove Logo"
            style={{ height: '180px', width: 'auto' }}
          />
        </Link>
      </div>
      <div>
        <Link key="home" to="/">
          Home
        </Link>
        <Link key="about-us" to="/about-us">
          About
        </Link>
        <Link key="add-hotel" to="/add-hotel">
          Add hotel
        </Link>
        <Link key="add-place" to="/add-place">
          Add place
        </Link>
        <Link key="add-country" to="/add-country">
          Add country
        </Link>
        <Link key="contacts" to="/contacts">
          Contacts
        </Link>
        <Link key="gallery" to="/gallery">
          Gallery
        </Link>
        <Link key="book-flight" to="/book-flight">
          Book Flight
        </Link>
        <Link key="book-hotel" to="/book-hotel">
          Book Hotel
        </Link>
        <Link key="community-chat" to="/community-chat">
          Community Chat
        </Link>
        <Link key="user-blog" to="/user-blog">
          User Blog
        </Link>
        <Link key="flight-tracking" to="/flight-tracking">
          Flight Tracking
        </Link>

        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Nav
