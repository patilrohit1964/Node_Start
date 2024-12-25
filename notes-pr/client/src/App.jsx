import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminRoute from './components/AdminRoute'
import NavbarNav from './components/NavbarNav'
import PrivateRoute from './components/PrivateRoute'
import { ThemeProvider } from './context/ThemeContext'
import CreateNote from './pages/CreateNote'
import Home from './pages/Home'
import Login from './pages/Login'
import NoteDetails from './pages/NoteDetails'
import ShowNote from './pages/ShowNote'
import SignUp from './pages/SignUp'
import UserEdit from './pages/UserEdit'
import AdminLayout from './pages/admin/AdminLayout'
import AllUsers from './pages/admin/AllUsers'
import Dashboard from './pages/admin/Dashboard'
import AllNotes from './pages/admin/AllNotes'

function App() {

  return (
    <ThemeProvider>
      <div className="min-h-screen theme-bg theme-text">
        <NavbarNav />
        <div className="transition-theme">
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<AllUsers />} />
                <Route path="notes" element={<AllNotes />} />
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
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
