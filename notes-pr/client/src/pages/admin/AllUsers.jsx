import React, { useMemo, useState } from 'react';
import { useGetAllUsersQuery } from '../../features/api/adminApi';
import { useTable, useSortBy, usePagination } from "react-table";
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import AddUserModal from './components/AddUserModal';
import DeleteUserModal from './components/DeleteUserModal';
import EditUserModal from './components/EditUserModal';


const AllUsers = () => {
    const { data, isLoading, isError, error } = useGetAllUsersQuery();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "_id",
            Cell: ({ value }) => (
                <span className="text-sm font-mono theme-text-secondary">{value.slice(0, 8)}...</span>
            )
        },
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ value, row }) => (
                <div className="flex items-center gap-3">
                    <div className="avatar w-8 h-8">
                        <img className="w-full h-full rounded-full bg-blue-100" src={row?.original?.profilePic} alt='profile-pic' />
                    </div>
                    <span className="font-medium theme-text">{value}</span>
                </div>
            )
        },
        {
            Header: "Email",
            accessor: "email",
            Cell: ({ value }) => (
                <span className="theme-text-secondary">{value}</span>
            )
        },
        {
            Header: "Created At",
            accessor: (row) => new Date(row.createdAt).toLocaleDateString(),
            Cell: ({ value }) => (
                <span className="text-sm theme-text-secondary">{value}</span>
            )
        },
        {
            Header: "Role",
            accessor: "role",
            Cell: ({ value }) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'admin'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-100 dark:bg-gray-700 theme-text'
                    }`}>
                    {value}
                </span>
            )
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }) => (
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        onClick={() => {
                            setSelectedUser(row.original);
                            setIsEditModalOpen(true);
                        }}
                    >
                        <FiEdit2 size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                        onClick={() => {
                            setSelectedUser(row.original);
                            setIsDeleteModalOpen(true);
                        }}
                    >
                        <FiTrash2 size={16} />
                    </motion.button>
                </div>
            )
        }
    ], []);

    const tableData = useMemo(() => data?.users || [], [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: tableData,
            initialState: { pageSize: 10 }
        },
        useSortBy,
        usePagination
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto p-4"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold theme-text dark:text-black">All Users</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 theme-button rounded-md"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add New User
                </motion.button>
            </div>

            {isLoading && (
                <div className="flex justify-center p-8">
                    <Spinner animation="border" className="text-primary" />
                </div>
            )}

            {isError && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg"
                >
                    {error?.data?.message || 'Error loading users. Please try again later.'}
                </motion.div>
            )}

            {!isLoading && !isError && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="theme-card overflow-hidden">
                        <table {...getTableProps()} className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700/50">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="px-6 py-3 text-left text-xs font-medium theme-text uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {column.render('Header')}
                                                    <span className="theme-text-secondary">
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? '↓'
                                                                : '↑'
                                                            : ''}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="divide-y theme-border">
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            className="theme-hover"
                                        >
                                            {row.cells.map(cell => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 whitespace-nowrap"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 px-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className={`px-4 py-2 rounded-md border border-blue-400 dark:border-blue-700 ${!canPreviousPage
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'theme-button'
                                }`}
                        >
                            Previous
                        </motion.button>
                        <span className="theme-text dark:text-black">
                            Page{' '}
                            <span className="font-medium">{pageIndex + 1}</span>
                            {' '}of{' '}
                            <span className="font-medium">{pageOptions.length}</span>
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className={`px-4 py-2 rounded-md border text-black dark:text-white border-blue-400 dark:border-blue-700 ${!canNextPage
                                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'theme-button'
                                }`}
                        >
                            Next
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {/* Modals */}
            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />
            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />
        </motion.div>
    );
};

export default AllUsers;
