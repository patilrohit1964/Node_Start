import React, { useEffect, useState } from 'react'
import { useOtpVerifyMutation } from '../features/api/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Otp = () => {
    const [otp, setOtp] = useState("");
    let [message, setMessage] = useState("");
    const navigate = useNavigate()
    const [otpVerify, { isLoading, error }] = useOtpVerifyMutation();

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const responce = await otpVerify(otp);
        if (responce?.data) {
            toast.success(responce?.data?.message);
            setMessage("Successfully");
            setOtp("");
            navigate("/login");
        } else {
            setMessage(error?.data?.message);
            toast.error(responce?.error?.data?.message);
            setOtp("");
        }
    };


    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-semibold mb-4 text-center dark:text-black">OTP Verification</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleChange}
                            placeholder="Enter OTP"
                            required
                            maxLength="6"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {isLoading ?
                            <div className='gap-2 flex items-center justify-center'>
                                <Spinner animation="grow" size='sm' />
                                <Spinner animation="grow" size='sm' />
                                <Spinner animation="grow" size='sm' />
                            </div>
                            : "Verify OTP"
                        }
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-sm text-center ${message.includes("Successfully")
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Otp