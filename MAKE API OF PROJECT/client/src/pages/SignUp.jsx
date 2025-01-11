import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
        role: '',
        location: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long!');
            return;
        }

        setIsSubmitting(true);

        // Simulate form submission success
        setTimeout(() => {
            alert('User registered successfully!');
            setIsSubmitting(false);
            setFormData({
                username: '',
                email: '',
                dob: '',
                role: '',
                location: '',
                password: '',
                confirmPassword: '',
            });
        }, 2000);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="mt-5" data-aos="fade-up" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className="text-center">Sign Up</h1>
                {error && <div className="alert alert-danger">{error}</div>}
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
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        name="dob"
                        type="date"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.dob}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <select
                        name="role"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.role}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Explorer">Explorer</option>
                    </select>
                </div>
                <div className="form-group mb-3">
                    <input
                        name="location"
                        type="text"
                        placeholder="Location"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.location}
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
                <div className="form-group mb-3">
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
