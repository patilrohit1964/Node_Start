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
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggler from './ThemeToggler';
import { useTheme } from '../context/ThemeContext';

function NavbarNav() {
    const { user, isAuthenticated } = useSelector(state => state.authReducer);
    const [logOutUser, { data, isSuccess }] = useLogOutUserMutation();
    const navigate = useNavigate();
    const [showProfileEdit, setShowProfileEdit] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const { isDarkMode } = useTheme();

    const handleLogout = async () => {
        await logOutUser();
        navigate("/login");
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User Logout Successfully");
        }
    }, [isSuccess, data]);

    const closeOffcanvas = () => {
        setIsOffcanvasOpen(false);
    };

    const getProfileImageUrl = (profilePicPath) => {

        if (profilePicPath.charAt(0) === "h") {
            return profilePicPath
        }
        return `http://localhost:8000/${profilePicPath}`;
    }

    return (
        <nav className="theme-bg border-b theme-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold theme-text no-underline">Notes App</Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink
                            className={({ isActive }) =>
                                `nav-link theme-text no-underline hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md ${
                                    isActive ? 'text-blue-600 dark:text-blue-400 active' : ''
                                }`
                            }
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `nav-link theme-text no-underline hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md ${
                                    isActive ? 'text-blue-600 dark:text-blue-400 active' : ''
                                }`
                            }
                            to="/create-note"
                        >
                            Add Note
                        </NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                `nav-link theme-text no-underline hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md ${
                                    isActive ? 'text-blue-600 dark:text-blue-400 active' : ''
                                }`
                            }
                            to="/show-notes"
                        >
                            See Notes
                        </NavLink>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOffcanvasOpen(true)}
                            className="inline-flex items-center justify-center p-2 rounded-md theme-text hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Auth Buttons / Profile */}
                    <div className="hidden md:block">
                        {!user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/login">
                                    <Button variant="outline-primary" className="theme-text border-current">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="outline-primary" className="theme-text border-current">Register</Button>
                                </Link>
                            </div>
                        ) : (
                            <Menu as="div" className="relative">
                                <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                                    <img
                                        alt="profile"
                                        src={getProfileImageUrl(user?.profilePic)}
                                        className="h-8 w-8 rounded-full border border-white"
                                    />
                                </MenuButton>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right theme-bg theme-border rounded-md py-1 shadow-lg">
                                    <MenuItem>
                                        <button
                                            onClick={() => setShowProfileEdit(true)}
                                            className="block w-full px-4 py-2 text-sm theme-text hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                                        >
                                            Your Profile: {user?.name}
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full px-4 py-2 text-sm theme-text hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                                        >
                                            Sign out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggler />
                    </div>
                </div>
            </div>

            {/* Mobile Offcanvas Menu */}
            {isOffcanvasOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeOffcanvas}></div>

                    {/* Offcanvas content */}
                    <div className="fixed inset-y-0 right-0 w-64 theme-bg px-6 py-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold theme-text">Menu</h2>
                            <button onClick={closeOffcanvas} className="theme-text">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link no-underline text-white hover:text-gray-300 ${isActive ? 'text-blue-400 active' : ''
                                    }`
                                }
                                to="/"
                                onClick={closeOffcanvas}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link no-underline text-white hover:text-gray-300 ${isActive ? 'text-blue-400 active' : ''
                                    }`
                                }
                                to="/create-note"
                                onClick={closeOffcanvas}
                            >
                                Add Note
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    `nav-link no-underline text-white hover:text-gray-300 ${isActive ? 'text-blue-400 active' : ''
                                    }`
                                }
                                to="/show-notes"
                                onClick={closeOffcanvas}
                            >
                                See Notes
                            </NavLink>

                            {user ? (
                                <div className="pt-4 border-t border-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <img
                                            src={getProfileImageUrl(user?.profilePic)}
                                            alt="profile"
                                            className="h-8 w-8 rounded-full border border-white"
                                        />
                                        <span>{user.name}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowProfileEdit(true);
                                            closeOffcanvas();
                                        }}
                                        className="w-full text-left py-2 text-white hover:text-gray-300"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeOffcanvas();
                                        }}
                                        className="w-full text-left py-2 text-white hover:text-gray-300"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-gray-700 space-y-4">
                                    <Link
                                        to="/login"
                                        className="block w-full "
                                        onClick={closeOffcanvas}
                                    >
                                        <Button variant="outline-light" className="w-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block w-full"
                                        onClick={closeOffcanvas}
                                    >
                                        <Button variant="outline-light" className="w-full">
                                            Register
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Edit Modal */}
            {showProfileEdit && (
                <UserEdit onClose={() => setShowProfileEdit(false)} />
            )}
        </nav>
    );
}

export default NavbarNav;