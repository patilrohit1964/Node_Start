import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#"
                    className="text-white text-2xl font-bold hover:text-yellow-300 transition duration-300"
                >
                    MyLogo
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/add-movie"
                        className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
                    >
                        Add Movie
                    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white text-2xl focus:outline-none"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Links */}
            {isOpen && (
                <div
                    className="md:hidden bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mt-4 shadow-lg"
                    onClick={() => setIsOpen(false)}
                >
                    <Link
                        to="/"
                        className="block px-4 py-2 text-white font-medium hover:bg-yellow-300 hover:text-black transition duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/add-movie"
                        className="block px-4 py-2 text-white font-medium hover:bg-yellow-300 hover:text-black transition duration-300"
                    >
                        About
                    </Link>
                </div>
            )}
        </nav>
    );
}
