import axios from "axios";
import React, { useState, useEffect } from "react";
import { MOVIE_URL } from "../utils/constants";

const MovieList = () => {
    // Mock data for movies (replace with API fetch or props as needed)
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Inception",
            genre: "Sci-Fi",
            director: "Christopher Nolan",
            release_year: 2010,
            description: "A skilled thief is given a chance at redemption.",
        },
        {
            id: 2,
            title: "The Dark Knight",
            genre: "Action",
            director: "Christopher Nolan",
            release_year: 2008,
            description: "A battle between Batman and the Joker in Gotham City.",
        },
        {
            id: 3,
            title: "Interstellar",
            genre: "Sci-Fi",
            director: "Christopher Nolan",
            release_year: 2014,
            description: "Exploration of a wormhole for humanity's survival.",
        },
        // Add more movies here...
    ]);

    const getMoviesData = async () => {
        const { data } = await axios.get(`${MOVIE_URL}/get-movies`);
        console.log(data);
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
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className="relative bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    >
                        {/* Animated Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-pink-300 opacity-0 hover:opacity-30 transition duration-300 rounded-lg"></div>

                        {/* Image Section */}
                        <div className="mb-4">
                            <img
                                src={`http://localhost:6060/${movie.imageUrl}` || "https://via.placeholder.com/150"}
                                alt={movie.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </div>

                        {/* Movie Info */}
                        <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-semibold">Genre:</span> {movie.genre}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Director:</span> {movie.director}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Release Year:</span> {movie.release_year}
                        </p>
                        <p className="text-sm text-gray-600 mt-4">{movie.description}</p>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MovieList;
