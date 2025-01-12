import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import AOS from 'aos';
import CustomNavbar from './components/Navbar';
import Private from './components/Private';
import About from './pages/About';
import DetailTable from './pages/DetailTable.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
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
            <Route path="/table" element={<DetailTable />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
