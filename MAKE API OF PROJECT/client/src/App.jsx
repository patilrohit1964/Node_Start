import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import AOS from 'aos';
import CustomNavbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Private from './components/Private';

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="container mt-4">
        <Routes>
          <Route element={<Private />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
