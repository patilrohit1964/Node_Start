import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-lg fixed w-full z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    className="text-white text-2xl font-bold hover:text-yellow-300 transition duration-300 transform hover:scale-105"
                >
                    MyLogo
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">
                    {user ? (
                        <>
                            <Link
                                to="/"
                                className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300 transform hover:scale-105"
                            >
                                Home
                            </Link>
                            <Link
                                to="/add-movie"
                                className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300 transform hover:scale-105"
                            >
                                Add Movie
                            </Link>
                            <div className="flex items-center">

                                <button
                                    className="inline-flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 sm:w-auto"
                                    onClick={logoutHandler}
                                >
                                    Logout
                                </button>
                                {/* <p className="text-white pt-3">Hello: {user?.username?.slice(0, 10) + " ..."}</p> */}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                className="nav-link text-white hover:text-yellow-300 transition duration-300 transform hover:scale-105"
                                to="/register"
                            >
                                Sign Up
                            </Link>
                            <Link
                                className="nav-link text-white hover:text-yellow-300 transition duration-300 transform hover:scale-105"
                                to="/login"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white text-3xl focus:outline-none"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Links */}
            {isOpen && (
                <div
                    className="md:hidden bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mt-4 shadow-lg transform transition-all duration-500"
                    onClick={() => setIsOpen(false)}
                >
                    <Link
                        to="/"
                        className="block px-4 py-2 text-white font-medium hover:bg-yellow-300 hover:text-black transition duration-300 transform hover:scale-105"
                    >
                        Home
                    </Link>
                    <Link
                        to="/add-movie"
                        className="block px-4 py-2 text-white font-medium hover:bg-yellow-300 hover:text-black transition duration-300 transform hover:scale-105"
                    >
                        Add Movie
                    </Link>
                </div>
            )}
        </nav>
    );
}
