import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export default function Root() {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} element={component} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}
