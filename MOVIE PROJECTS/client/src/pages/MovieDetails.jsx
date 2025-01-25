import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MOVIE_URL } from '../utils/constants';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from "react-toastify";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
const MovieDetails = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const [open, setOpen] = useState(false);

    const { id } = useParams()
    const getMoviesData = async () => {
        try {
            const { data } = await axios.get(`${MOVIE_URL}/get-movie/${id}`, {
                withCredentials: true,
            });
            if (data?.success) {
                setMovieDetails(data?.movie);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        AOS.init();
        getMoviesData();
    }, [])

    return (
        <div className='h-screen flex items-center justify-center'>
            <div
                className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-6"
                data-aos="fade-up"
                data-aos-duration="1000"
            > {/* Image Section */}
                <div className="mb-4 cursor-pointer">
                    <img
                        src={`http://localhost:6060/${movieDetails?.image}`}
                        alt={movieDetails?.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">{movieDetails?.title}</h2>
                    <span className="text-lg font-bold text-green-500">{movieDetails?.genre}</span>
                </div>
                <div className="mt-4 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Director:</span>
                        <span className="text-gray-600">{movieDetails?.director}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Release Year:</span>
                        <span className="text-gray-600">{movieDetails?.release_year}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-700">Description:</span>
                        <p className="text-gray-600">{movieDetails?.description}</p>
                    </div>
                </div>
                <div className='flex justify-around w-56 m-auto mt-14 items-center'>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                        onClick={() => setOpen(true)}>
                        <EditMovie open={open} setOpen={setOpen} />
                        Edit
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                        onClick={() => setOpen(true)}>
                        <Delete open={open} setOpen={setOpen} />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails


function Delete({ open, setOpen }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const DeleteMovie = async () => {
        try {
            const { data } = await axios.delete(`${MOVIE_URL}/delete-movie/${id}`, {
                withCredentials: true,
            });
            if (data.success) {
                toast.success(data.message);
                setOpen(false);
                navigate("/");
            }
        } catch (error) {
            console.log(error?.message);
        }
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Deactivate account
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to Delete This Movie? All of your data will be permanently removed.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={DeleteMovie}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

function EditMovie({ open, setOpen }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const EditMovie = async () => {
        try {
            const { data } = await axios.delete(`${MOVIE_URL}/update-movie/${id}`, {
                withCredentials: true,
            });
            if (data.success) {
                toast.success(data.message);
                setOpen(false);
                navigate("/");
            }
        } catch (error) {
            console.log(error?.message);
        }
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    {/* <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" /> */}
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Deactivate account
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to Delete This Movie? All of your data will be permanently removed.
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={EditMovie}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
