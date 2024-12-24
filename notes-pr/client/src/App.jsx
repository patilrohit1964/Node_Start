import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavbarNav from './components/NavbarNav'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import CreateNote from './pages/CreateNote'
import ShowNote from './pages/ShowNote'
import NoteDetails from './pages/NoteDetails'
import PrivateRoute from './components/PrivateRoute'
import UserEdit from './pages/UserEdit'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AllUsers from './pages/admin/AllUsers'
import AdminRoute from './components/AdminRoute'


function App() {
  return (
    <div>
      <NavbarNav />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        
        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="notes" element={<div>Notes Management</div>} />
            <Route path="settings" element={<div>Admin Settings</div>} />
          </Route>
        </Route>

        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/create-note' element={<CreateNote />} />
          <Route path='/show-notes' element={<ShowNote />} />
          <Route path='/edit-profile' element={<UserEdit />} />
          <Route path='/note-details/:noteId' element={<NoteDetails />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
