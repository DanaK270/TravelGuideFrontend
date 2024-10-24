// src/components/Navbar.jsx
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'
import { DarkModeContext } from '../contexts/DarkModeContext'

export default function Navbar({ handleLogOut, user }) {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  console.log(user)

  return (
    <header className="navbar">
      {user?.role === 'admin' && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}

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
      {/* Sidebar */}
      {user?.role === 'admin' && (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="add-features">
            <h2>Add Features</h2>
            <br />
            <div className="feature-links">
              <Link
                to="/add-country"
                className="feature-link"
                style={{ textDecoration: 'none', fontSize: '20px' }}
              >
                Add Country
              </Link>
              <br />
              <br />
              <Link
                to="/add-hotel"
                className="feature-link"
                style={{ textDecoration: 'none', fontSize: '20px' }}
              >
                Add Hotel
              </Link>
              <br />
              <br />
              <Link
                to="/add-place"
                className="feature-link"
                style={{ textDecoration: 'none', fontSize: '20px' }}
              >
                Add Place
              </Link>
            </div>
          </div>
        </aside>
      )}
    </header>
  )
}
