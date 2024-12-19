import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import './index.css'
import { Provider } from "./components/ui/provider.jsx"
createRoot(document.getElementById('root')).render(
  <>
    <Provider>
      <App />
    </Provider>
    <ToastContainer position='top-right' autoClose={2000} hideProgressBar={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
  </>,
)
