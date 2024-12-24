import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateProfileMutation } from '../features/api/userApi';
import { Spinner } from 'react-bootstrap';

const UserEdit = ({ onClose }) => {

    const { user } = useSelector((state) => state.authReducer);
    const [name, setName] = useState(user?.name || '');
    const [profilePic, setProfilePic] = useState(user?.profilePic || '');
    const [showPreview, setShowPreview] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const [updateProfile, { isLoading, data, isError }] = useUpdateProfileMutation();
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(file);
            setShowPreview(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement update profile logic
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", profilePic);
        await updateProfile(formData).unwrap();
        toast.success("Profile updated successfully");
        onClose();
    };

    const getProfileImageUrl = (profilePicPath) => {

        if (profilePicPath.charAt(0) === "h") {
            return profilePicPath
        }
        return `http://localhost:8000/${profilePicPath}`;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[400px] max-w-[95%]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-dark">My profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Image Section */}
                    <div className="text-sm text-gray-600 mb-2">Profile image</div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                            {!showPreview ? (
                                <img
                                    src={getProfileImageUrl(user?.profilePic)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <img
                                        src={URL.createObjectURL(profilePic)}
                                        alt="Profile"
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
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white text-black"
                        />
                    </div>

                    {/* User ID Display */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            User ID
                        </label>
                        <div className="w-full px-3 py-2 bg-gray-100 rounded-md text-gray-500">
                            {user?._id || 'user@example.com'}
                        </div>
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
                            {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEdit; 