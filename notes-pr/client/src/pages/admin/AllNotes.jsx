import React from 'react';
import { useGetAllNotesQuery } from '../../features/api/adminApi';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AllNotes = () => {
    const { data: notes, isLoading, error } = useGetAllNotesQuery();
    console.log(notes?.notes)


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="theme-card p-4 text-red-600 dark:text-red-400">
                Error loading notes: {error?.message}
            </div>
        );
    }

    return (
        <div className="theme-bg p-6">
            <h2 className="text-2xl font-semibold theme-text mb-6">All Notes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes?.notes?.map((note) => (
                    <motion.div
                        key={note?._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="theme-card overflow-hidden"
                    >
                        {/* Note Image */}
                        <div className="relative h-48 w-full">
                            <img
                                src={note?.noteImage?.startsWith('http')
                                    ? note?.noteImage
                                    : `${import.meta.env.VITE_SERVER_URL}/${note?.noteImage}`
                                }
                                alt={note?.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Note Content */}
                        <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                {/* User Avatar */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={note?.userId?.profilePic?.startsWith('http')
                                            ? note?.userId?.profilePic
                                            : `${import.meta.env.VITE_SERVER_URL}/${note?.userId?.profilePic}`
                                        }
                                        alt={note?.userId?.name}
                                        className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
                                    />
                                </div>
                                {/* User Info */}
                                <div>
                                    <h3 className="theme-text font-medium">
                                        {note?.userId?.name}
                                    </h3>
                                    <p className="theme-text-secondary text-sm">
                                        {moment(note?.createdAt).format('MMM DD, YYYY')}
                                    </p>
                                </div>
                            </div>

                            {/* Note Title & Description */}
                            <h4 className="theme-text font-semibold text-lg mb-2">
                                {note?.title}
                            </h4>
                            <p className="theme-text-secondary line-clamp-2 mb-4">
                                {note?.description}
                            </p>

                            {/* Actions */}
                            <div className="flex justify-between items-center">
                                <Link
                                    to={`/note-details/${note?._id}`}
                                    className="theme-button px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    View Details
                                </Link>
                                <span className="theme-text-secondary text-sm">
                                    {moment(note?.createdAt).fromNow()}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {notes?.notes?.length === 0 && (
                <div className="theme-card p-8 text-center">
                    <p className="theme-text text-lg">No notes found</p>
                </div>
            )}
        </div>
    );
};

export default AllNotes; 