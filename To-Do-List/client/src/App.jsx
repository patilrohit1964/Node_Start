import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavbarNav from "./components/NavbarNav"
import About from './pages/About'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
function App() {


  return (
    <>

      <NavbarNav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
    </>
  )
}

export default App
