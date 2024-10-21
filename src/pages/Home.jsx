
// Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="navbar-title">Travel Trove</h1>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      </header>

      {/* Sidebar with Add Features */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="add-features">
          <h3>Add Features</h3>
          <div className="feature-links">
            <Link to="/add-country" className="feature-link">Add Country</Link>
            <Link to="/add-hotel" className="feature-link">Add Hotel</Link>
            <Link to="/add-place" className="feature-link">Add Place</Link>
          </div>
        </div>
      </aside>

      {/* Main Content with General Navigation */}
      <main className="main-content">
        <h2>Welcome to Travel Trove</h2>
        <p>Your ultimate travel planning companion!</p>

        <nav className="general-nav">
          <Link to="/sign-in">Sign In</Link>
          <Link to="/register">Register</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contacts">Contact Us</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/book-flight">Book Flight</Link>
          <Link to="/book-hotel">Book Hotel</Link>
          <Link to="/community-chat">Community Chat</Link>
          <Link to="/user-blog">User Blog</Link>
          <Link to="/flight-tracking">Flight Tracking</Link>
        </nav>
      </main>
    </div>
  )
}
