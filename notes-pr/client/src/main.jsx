import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position='top-right' autoClose={2000} hideProgressBar={true} closeOnClick={true} pauseOnHover={true} draggable={true} />
  </>,
)
