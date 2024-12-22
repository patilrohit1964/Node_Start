import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const NoteEdit = ({ onClose, noteData }) => {

    const [title, setTitle] = useState(noteData?.title || '');
    const [description, setDescription] = useState(noteData?.description || '');
    const [noteImage, setNoteImage] = useState(noteData?.noteImage || '');
    const [showPreview, setShowPreview] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNoteImage(file);
            setShowPreview(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement update profile logic
        toast.success('Profile updated successfully');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg p-6 w-[400px] max-w-[95%]`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Note Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Image Section */}
                    <div className="text-sm text-gray-600 mb-2">Note image</div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                            {!showPreview ? (
                                <img
                                    src={noteData?.noteImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <img
                                        src={URL.createObjectURL(noteImage)}
                                        alt="Note Image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <label className="text-purple-600 cursor-pointer hover:text-purple-700">
                            Upload
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>

                    {/* Nickname Input */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Note Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                        />
                    </div>


                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Note Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                        />
                    </div>

                    {/* Dark Theme Toggle */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Dark theme
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                                type="checkbox"
                                checked={isDarkTheme}
                                onChange={(e) => setIsDarkTheme(e.target.checked)}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${isDarkTheme ? 'bg-purple-600' : 'bg-gray-300'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteEdit;



