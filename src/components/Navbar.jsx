// src/components/Navbar.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'
import { DarkModeContext } from '../contexts/DarkModeContext'

export default function Navbar({ handleLogOut, user }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  console.log(user)

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title-link">
          <h1 className="navbar-title">Travel Trove</h1>
        </Link>
      </div>
      <nav className="navbar-links">
        <Link to="/sign-in">Sign In</Link>
        <Link to="/register">Register</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contacts">Contact Us</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/book-flight">Book Flight</Link>
        <Link to="/book-hotel">Book Hotel</Link>
        <Link to="/user-blog">User Blog</Link>
        <Link to="/flight-tracking">Flight Tracking</Link>
        <Link to="/countries">Countries</Link>
        <Link to="/community-chat">Community Chat</Link>
        <Link to="/profile">profile</Link>
        <Link to={`/bookmarks/${user?.id}`}>Bookmarks</Link>
        <button onClick={handleLogOut}>Logout</button>
      </nav>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  )
}
