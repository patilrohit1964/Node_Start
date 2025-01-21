import React, { useState } from "react";
import { Link } from "react-router-dom";
import { USER_URL } from "../utils/constants";
import axios from 'axios';
import { toast } from "react-toastify"
const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${USER_URL}/register`, formData, {
                withCredentials: true,
            });
            if (data?.success) {
                toast.success(data.message || "Register Success");
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                })
            }
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error?.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 animate-fade-in">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            name="username"
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 font-bold hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
