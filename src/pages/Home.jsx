// Home.jsx
import React from 'react'
// import { Link } from 'react-router-dom'

export default function Home({ user }) {
  // const [isSidebarOpen, setSidebarOpen] = useState(false)

  // const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <div className="home-wrapper">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/assets/travel-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      {/* <div className="content-overlay"> */}
      {/* <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button> */}

      {/* Sidebar */}
      {/* <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
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
        </aside> */}

      {/* Main Content */}
      <main className="main-content">
        <h2>Welcome to Travel Trove</h2>
        <p>Your ultimate travel planning companion!</p>
      </main>
    </div>
    // </div>
  )
}
