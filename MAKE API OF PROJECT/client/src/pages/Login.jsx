import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Login successful!');
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
