import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Travel Trove</h1>
      <nav>
        <Link to="/signin">Sign In</Link>
        <Link to="/register">Register</Link>
        <Link to="/add-country">Add Country</Link>
        <Link to="/add-hotel">Add Hotel</Link>
        <Link to="/add-place">Add Place</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/contacts">Contact Us</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/book-flight">Book Flight</Link>
        <Link to="/book-hotel">Book Hotel</Link>
        <Link to="/community-chat">Community Chat</Link>
        <Link to="/user-blog">User Blog</Link>
        <Link to="/flight-tracking">Flight Tracking</Link>
      </nav>
    </div>
  );
}

