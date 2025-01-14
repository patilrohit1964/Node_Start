import React from "react";

const MovieForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 w-full max-w-lg">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 animate-bounce">
                    Add Movie
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter the movie title"
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                            required
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label
                            htmlFor="genre"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Genre
                        </label>
                        <input
                            type="text"
                            id="genre"
                            placeholder="Enter the genre"
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-pink-400 transition"
                            required
                        />
                    </div>

                    {/* Director */}
                    <div>
                        <label
                            htmlFor="director"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Director
                        </label>
                        <input
                            type="text"
                            id="director"
                            placeholder="Enter the director's name"
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
                            required
                        />
                    </div>

                    {/* Release Year */}
                    <div>
                        <label
                            htmlFor="releaseYear"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Release Year
                        </label>
                        <input
                            type="number"
                            id="releaseYear"
                            placeholder="Enter the release year"
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                            required
                            min="1900"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-semibold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter the movie description"
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 hover:bg-pink-500 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        Add Movie
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MovieForm;
