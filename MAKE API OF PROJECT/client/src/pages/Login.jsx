import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:9090/user/login', formData, {
                withCredentials: true
            })
            if (result.status === 200) {
                alert("Login Successful!");
                navigate('/');
                setFormData({ username: '', password: '' });
            } else {
                alert("Invalid Credentials!");
            }
        }
        catch (err) {
            // Handle errors gracefully
            console.error("Login error:", err);
            alert("Error: " + (err.message));
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="mt-5" data-aos="fade-left" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center">Login</h1>
                <div className="form-group mb-3">
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.username}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
