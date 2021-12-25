import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes.js';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
export default function Root() {
  return (
    <>
      <Navbar />
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
