import React from 'react';
import { useGetAllNotesQuery } from '../../features/api/adminApi';

const Dashboard = () => {
    const { data, isLoading, error } = useGetAllNotesQuery();

    const stats = [
        { name: 'Total Users', value: data?.notes?.length },
        { name: 'Total Notes', value: data?.notes?.length },
        { name: 'Active Users', value: data?.notes?.length },
        { name: 'New Users (Today)', value: data?.notes?.length },
    ];

    return (
        <div className='theme-bg'>
            <h2 className="text-2xl font-semibold theme-text mb-6">Dashboard</h2>

            {/* Stats Grid */}
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="theme-card p-5"
                    >
                        <dt className="text-sm font-medium theme-text-secondary truncate">
                            {stat.name}
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold theme-text">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h3 className="text-lg font-medium theme-text mb-4">Recent Activity</h3>
                <div className="theme-card">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flow-root">
                            <ul className="divide-y theme-border">
                                {[1, 2, 3].map((item) => (
                                    <li key={item} className="py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium theme-text truncate">
                                                    User Activity {item}
                                                </p>
                                                <p className="text-sm theme-text-secondary truncate">
                                                    Action description here
                                                </p>
                                            </div>
                                            <div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                                    New
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 