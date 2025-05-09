import axios from "axios";
import React, { useState, useEffect } from "react";
import { MOVIE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MovieList = () => {
    // Mock data for movies (replace with API fetch or props as needed)
    const [movies, setMovies] = useState([]);

    const getMoviesData = async () => {
        try {
            const { data } = await axios.get(`${MOVIE_URL}/get-movies`, {
                withCredentials: true
            });
            if (data?.success) {
                toast.success(data?.message || "Movies Fetched successfully");
                setMovies(data?.movies);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
    useEffect(() => {
        getMoviesData();
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
            <h1 className="text-4xl font-extrabold text-center text-white mb-8 animate-pulse">
                Movie Collection
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies?.map((movie) => (
                    <Link to={`movie-details/${movie._id}`} key={movie?._id}>
                        <div
                            className="relative bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Animated Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-pink-300 opacity-0 hover:opacity-30 transition duration-300 rounded-lg"></div>

                            {/* Image Section */}
                            <div className="mb-4 cursor-pointer">
                                <img
                                    src={`http://localhost:6060/${movie?.image}`}
                                    alt={movie?.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>

                            {/* Movie Info */}
                            <h2 className="text-2xl font-bold text-gray-800">{movie?.title}</h2>
                            <p className="text-sm text-gray-600 mt-2">
                                <span className="font-semibold">Genre:</span> {movie?.genre}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Director:</span> {movie?.director}
                            </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold">Release Year:</span> {movie?.release_year}
                            </p>
                            <p className="text-sm text-gray-600 mt-4">{movie?.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default MovieList;
