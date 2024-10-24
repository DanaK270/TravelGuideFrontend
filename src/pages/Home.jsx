
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function Home({ user }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <div className="home-wrapper">
      <Slider {...carouselSettings} className="video-carousel">
        <div>
          <video autoPlay loop muted className="carousel-video">
            <source src="/assets/1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <video autoPlay loop muted className="carousel-video">
            <source src="/assets/2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <video autoPlay loop muted className="carousel-video">
            <source src="/assets/3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Slider>


      <div className="content-overlay">


        <main className="main-content">
          <div className="text-container">
            <h2>Welcome to Travel Trove</h2>
            <p>
              Discover and plan your perfect getaway with <strong>Travel Trove</strong>. 
              Whether you're looking for exotic destinations, comfortable hotels, or hidden 
              gems, we've got everything you need for a seamless travel experience!
            </p>
          </div>
        </main>
      </div>
=======
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
    </div>
    // </div>
  )
}
