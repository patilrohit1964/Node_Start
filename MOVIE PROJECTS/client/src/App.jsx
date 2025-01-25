import React from 'react'
import "./App.css"
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieForm from './pages/MovieForm'
import MovieList from './pages/MovieList'
import MovieDetails from './pages/MovieDetails'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/add-movie' element={<MovieForm />}></Route>
        <Route path='/' element={<MovieList />}></Route>
        <Route path='/movie-details/:id' element={<MovieDetails />}></Route>
      </Routes>
    </div>
  )
}

export default App