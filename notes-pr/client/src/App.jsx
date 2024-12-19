
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Footer from './pages/Footer'
import Navbar from './components/Navbar'
import { Button } from "./components/ui/button"
import { HStack } from "@chakra-ui/react"


const routers = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  }
])
function App() {
  toast.success('Hello World')
  return (
    <div>
      <Navbar />
      <RouterProvider router={routers} />
      <Demo />
      <Footer />
    </div>
  )
}

export default App


import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { toast } from 'react-toastify'

const Demo = () => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
