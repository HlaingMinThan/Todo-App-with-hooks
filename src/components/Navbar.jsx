import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="d-flex justify-content-center">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
