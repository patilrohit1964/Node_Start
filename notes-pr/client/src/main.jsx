import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
  </BrowserRouter>,
)
