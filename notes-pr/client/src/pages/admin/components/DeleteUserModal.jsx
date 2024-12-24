import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeleteUserMutation } from '../../../features/api/adminApi';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const DeleteUserModal = ({ isOpen, onClose, user }) => {
    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    const handleDelete = async () => {
        try {
            await deleteUser(user._id).unwrap();
            toast.success('User deleted successfully');
            onClose();
        } catch (error) {
            toast.error(error?.data?.message || 'Error deleting user');
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
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Delete User
                                </h3>
                                <p className="text-gray-500 mb-6">
                                    Are you sure you want to delete user "{user?.name}"? This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        onClick={handleDelete}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isLoading}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                    >
                                        {isLoading ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : (
                                            'Delete'
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DeleteUserModal; 