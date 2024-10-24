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
        {user?.role === "admin" && (
          <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              ☰
            </button>
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
          </>
        )}

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
    </div>
  );
}
