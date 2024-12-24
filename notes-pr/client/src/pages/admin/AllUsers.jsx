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
                        <img className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center" src={row?.original?.profilePic} alt='profile-pic' />
                    </div>
                    <span className="font-medium">{value}</span>
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
                <span className="text-sm text-gray-500">{value}</span>
            )
        },
        {
            Header: "Role",
            accessor: "role",
            Cell: ({ value }) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
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
                        className="btn btn-sm btn-ghost text-blue-600"
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
                        className="btn btn-sm btn-ghost text-red-600"
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
                <h2 className="text-2xl font-semibold text-gray-800">All Users</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
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
                    className="bg-red-50 text-red-500 p-4 rounded-lg"
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
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <table {...getTableProps()} className="table w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column, index) => (
                                            <th
                                                key={index}
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className="px-6 py-3 text-left text-xs font-medium theme-text-secondary uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                aria-sort={
                                                    column.isSorted
                                                        ? column.isSortedDesc
                                                            ? "descending"
                                                            : "ascending"
                                                        : "none"
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    {column.render('Header')}
                                                    <span className="text-gray-400">
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
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <motion.tr
                                            {...row.getRowProps()}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            {row.cells.map(cell => (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-6 py-4 whitespace-nowrap"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </motion.tr>
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
                            className={`btn btn-sm ${!canPreviousPage ? 'btn-disabled' : 'btn-primary'}`}
                        >
                            Previous
                        </motion.button>
                        <span className="text-sm text-gray-700">
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
                            className={`btn btn-sm ${!canNextPage ? 'btn-disabled' : 'btn-primary'}`}
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
