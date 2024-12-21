import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { isAuthenticated } = useSelector((state) => state.authReducer);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children || <Outlet />;
}

export default PrivateRoute