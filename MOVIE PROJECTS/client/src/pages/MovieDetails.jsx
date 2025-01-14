import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import 'aos/dist/aos.css';
const MovieDetails = () => {

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mt-6"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">{"movie.title"}</h2>
                <span className="text-lg font-bold text-green-500">{"movie.genre"}</span>
            </div>
            <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Director:</span>
                    <span className="text-gray-600">{"movie.director"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Release Year:</span>
                    <span className="text-gray-600">{"movie.release_year"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Description:</span>
                    <p className="text-gray-600">{"movie.description"}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails