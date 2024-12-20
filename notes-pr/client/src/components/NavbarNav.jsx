import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const user = false
function NavbarNav() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Nav className="m-auto">
                    <NavLink className="text-decoration-none text-white me-3" to="/home">Home</NavLink>
                    <NavLink className="text-decoration-none text-white me-3" to="#features">Features</NavLink>
                    <NavLink className="text-decoration-none text-white me-3" to="#pricing">Pricing</NavLink>
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
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5bpdR0qrbbZH5qTcbXea_Ebdr0iqPuE6y1A&s"
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
                                            Your Profile
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
                                    <MenuItem>
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
        </Navbar>
    );
}


export default NavbarNav;