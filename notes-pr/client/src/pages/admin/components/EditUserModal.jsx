import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateUserRoleMutation } from '../../../features/api/adminApi';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const EditUserModal = ({ isOpen, onClose, user }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user'
    });

    const [updateUser, { isLoading }] = useUpdateUserRoleMutation();

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'user'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({
                userId: user._id,
                role: formData.role
            }).unwrap();
            toast.success('User updated successfully');
            onClose();
        } catch (error) {
            toast.error(error?.data?.message || 'Error updating user');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 overflow-y-auto"
                    >
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                                <div className="flex justify-between items-center p-6 border-b">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Edit User
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500 text-3xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            disabled
                                            className="mt-1 ps-2 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="mt-1 ps-2 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Role
                                        </label>
                                        <select
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-blue-500"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                        >
                                            Cancel
                                        </button>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isLoading}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                        >
                                            {isLoading ? (
                                                <Spinner animation="border" size="sm" />
                                            ) : (
                                                'Update User'
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditUserModal; 