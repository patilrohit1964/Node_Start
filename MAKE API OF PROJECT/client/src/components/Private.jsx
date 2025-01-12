import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Private = ({ children }) => {
    const user = localStorage.getItem('user');

    if (user) {
        return <Outlet /> || children;
    }
    return (<Navigate to="/login" />);
}

export default Private