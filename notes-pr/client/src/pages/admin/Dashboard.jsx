import React from 'react';

const Dashboard = () => {
    const stats = [
        { name: 'Total Users', value: '1,234' },
        { name: 'Total Notes', value: '5,678' },
        { name: 'Active Users', value: '892' },
        { name: 'New Users (Today)', value: '25' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
            
            {/* Stats Grid */}
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white overflow-hidden shadow rounded-lg"
                    >
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {stat.name}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                {stat.value}
                            </dd>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-4 bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flow-root">
                            <ul className="-my-5 divide-y divide-gray-200">
                                {[1, 2, 3].map((item) => (
                                    <li key={item} className="py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="h-8 w-8 rounded-full bg-gray-200" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    User Activity {item}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Action description here
                                                </p>
                                            </div>
                                            <div>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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