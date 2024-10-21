// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
      </nav>
    </header>
  );
}
