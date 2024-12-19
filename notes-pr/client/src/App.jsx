
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Footer from './pages/Footer'
import Navbar from './components/Navbar'


const routers = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  }
])
function App() {
  return (
    <div>
      <Navbar />
      <RouterProvider router={routers} />
      <Footer />
    </div>
  )
}

export default App
