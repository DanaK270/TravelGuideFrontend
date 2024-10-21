// pages/Home.jsx
import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Home({ user }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <div className="home-container">
      {user?.isAdmin && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="add-features">
          <h3>Add Features</h3>
          <div className="feature-links">
            <Link to="/add-country" className="feature-link">
              Add Country
            </Link>
            <Link to="/add-hotel" className="feature-link">
              Add Hotel
            </Link>
            <Link to="/add-place" className="feature-link">
              Add Place
            </Link>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <h2>Welcome to Travel Trove</h2>
        <p>Your ultimate travel planning companion!</p>
      </main>
    </div>
  )
}
