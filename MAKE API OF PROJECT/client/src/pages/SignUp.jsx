import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
        role: 'Explorer',
        location: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        setError('');
        try {
            const result = await axios.post('http://localhost:9090/user/register', formData, {
                withCredentials: true
            })
            if (result.status == 201) {
                setSuccess(true);
                alert("register successfully");
                localStorage.setItem("user", JSON.stringify(result.data.user))
                setFormData({
                    username: '',
                    email: '',
                    dob: '',
                    role: 'Explorer',
                    location: '',
                    password: '',
                    confirmPassword: '',
                });
                navigate("/")
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mt-5">
                <div
                    className="col-md-6 mt-5"
                    style={{ animation: 'fadeIn 1s ease-in-out' }}
                >
                    <div className="card shadow-lg">
                        <div className="card-header text-center bg-primary text-white">
                            <h4>
                                <i className="bi bi-person-circle"></i> Register
                            </h4>
                        </div>
                        <div className="card-body">
                            {/* Success and Error Messages */}
                            {success && (
                                <div
                                    className="alert alert-success alert-dismissible fade show"
                                    role="alert"
                                >
                                    <strong>Success!</strong> Registration completed successfully.
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}
                            {error && (
                                <div
                                    className="alert alert-danger alert-dismissible fade show"
                                    role="alert"
                                >
                                    <strong>Error:</strong> {error}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="alert"
                                        aria-label="Close"
                                    ></button>
                                </div>
                            )}

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="needs-validation"
                                noValidate
                            >
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInLeft 0.8s' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInRight 0.8s' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInLeft 0.8s' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">
                                        Role
                                    </label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInRight 0.8s' }}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Explorer">Explorer</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInLeft 0.8s' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInRight 0.8s' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        style={{ animation: 'slideInLeft 0.8s' }}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                        style={{ animation: 'pulse 1.5s infinite' }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
