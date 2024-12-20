import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLogOutUserMutation } from '../features/api/userApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserEdit from '../pages/UserEdit';


function NavbarNav() {

    const { user, isAuthenticated, token } = useSelector(state => state.authReducer);
    const [logOutUser, { data, isSuccess }] = useLogOutUserMutation()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await logOutUser();
        navigate("/login");
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "user Logut Successfully");
        }
    }, [isSuccess])

    const [showProfileEdit, setShowProfileEdit] = useState(false);

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Nav className="m-auto">
                    <NavLink className="text-decoration-none text-white me-3" to="/">Home</NavLink>
                    <NavLink className="text-decoration-none text-white me-3" to="/create-note">Add Note</NavLink>
                    <NavLink className="text-decoration-none text-white me-3" to="/show-note">See Notes</NavLink>
                </Nav>
            </Container>
            {
                !user ?
                    (
                        <div className='text-light w-[12%] flex items-center justify-between'>
                            <Link to="/login">
                                <Button variant="outline-light">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="outline-light">Register</Button>
                            </Link>
                        </div>
                    ) :
                    (
                        <div className='w-[12%] flex items-center justify-between'>
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt="porfile not found"
                                            src={user?.profilePic}
                                            className="size-8 rounded-full border border-white"
                                        />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Your Profile: {user?.name}
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                            {/* <Avatar name="John Doe" size="25" round={true} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5bpdR0qrbbZH5qTcbXea_Ebdr0iqPuE6y1A&s' className='cursor-pointer h-20 w-20' /> */}
                        </div>
                    )
            }
            {showProfileEdit && (
                <UserEdit onClose={() => setShowProfileEdit(false)} />
            )}
            <button onClick={() => setShowProfileEdit(true)}>
                Edit Profile
            </button>
        </Navbar>
    );
}


export default NavbarNav;