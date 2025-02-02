import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../features/api/userApi";
export default function SignUp() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const [registerUser, { isLoading, error, isError, isSuccess, data }] = useRegisterUserMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await registerUser({ name, email, password });

        // Check if the mutation was successful before navigating
        if (response?.data?.success) { // Assuming the server response includes a "success" field
            navigate("/verify-otp");
            toast.success("Registration successful. Please check your email for verification.");
        } else {
            toast.error(response?.data?.message || "Registration failed");
            console.error("Error during registration:", response?.error || "Unknown error");
            // Optionally, handle the error state in your UI
        }
    };


    return (
        <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
            <div className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-9">
                        <div className="card text-black mt-36" style={{ borderRadius: "20px" }}>
                            <div className="card-body p-4">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6">
                                        <h2 className="text-center fw-bold mb-3 dark:text-white">Sign Up</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Your Name"
                                                    value={name}
                                                    onChange={(e) => setname(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Your Email"
                                                    value={email}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setpassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="d-grid">
                                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                                    {isLoading ? <Spinner animation="border" size="sm" /> : "Register"}
                                                </button>
                                            </div>

                                            <div className="text-center mt-3 dark:text-white">
                                                <p>
                                                    Already have an account?{" "}
                                                    <Link to="/login">Login</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-5 d-flex align-items-center">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid"
                                            alt="Sample"
                                            style={{ maxHeight: "300px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
