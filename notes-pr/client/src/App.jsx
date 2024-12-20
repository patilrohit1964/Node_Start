
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavbarNav from './components/NavbarNav'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'



function App() {
  return (
    <div>
      <NavbarNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
