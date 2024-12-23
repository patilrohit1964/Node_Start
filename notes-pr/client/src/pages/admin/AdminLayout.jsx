import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: '📊' },
        { path: '/admin/users', name: 'Users', icon: '👥' },
        { path: '/admin/notes', name: 'Notes', icon: '📝' },
        { path: '/admin/settings', name: 'Settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`${
                                        location.pathname === item.path
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile header */}
            <div className="md:hidden bg-gray-800 text-white">
                <div className="flex items-center justify-between h-16 px-4">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-gray-700"
                    >
                        {isSidebarOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile sidebar */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
                    <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-gray-800">
                        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
                            <h1 className="text-white text-xl font-bold">Admin Panel</h1>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="text-gray-300 hover:text-white"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`${
                                        location.pathname === item.path
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="md:pl-64 flex flex-col flex-1">
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout; 