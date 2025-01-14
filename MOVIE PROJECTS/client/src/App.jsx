import React from 'react'
import "./App.css"
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieForm from './pages/MovieForm'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/add-movie' element={<MovieForm />}></Route>
      </Routes>
    </div>
  )
}

export default App