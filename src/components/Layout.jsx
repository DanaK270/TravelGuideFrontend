// components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ user, handleLogOut }) {
  return (
    <>
      <Navbar user={user} handleLogOut={handleLogOut} />
      <Outlet />
    </>
  );
}
