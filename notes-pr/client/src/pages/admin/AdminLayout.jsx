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
        <div className="min-h-screen theme-bg">
            {/* Sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                <div className="flex-1 flex flex-col min-h-0 theme-sidebar">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <h1 className="theme-text text-2xl font-bold">Admin Panel</h1>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`${
                                        location.pathname === item.path
                                            ? 'theme-active-link'
                                            : 'theme-link'
                                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
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
            <div className="md:hidden theme-sidebar">
                <div className="flex items-center justify-between h-16 px-4">
                    <h1 className="text-xl font-bold theme-text">Admin Panel</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md theme-button-outline"
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
                    <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setIsSidebarOpen(false)} />
                    <div className="fixed inset-y-0 left-0 flex flex-col w-64 theme-sidebar">
                        <div className="flex items-center justify-between h-16 px-4 theme-sidebar-header">
                            <h1 className="text-xl font-bold theme-text">Admin Panel</h1>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="theme-text hover:text-gray-300"
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
                                            ? 'theme-active-link'
                                            : 'theme-link'
                                    } group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors`}
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