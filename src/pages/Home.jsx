// Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Home({ user }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="home-wrapper">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/assets/travel-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="content-overlay">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>

        {/* Sidebar */}
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

        {/* Main Content */}
        <main className="main-content">
          <h2>Welcome to Travel Trove</h2>
          <p>Your ultimate travel planning companion!</p>
        </main>
      </div>
    </div>
  );
}
