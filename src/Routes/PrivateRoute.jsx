import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/Api/userApi';
import { Skeleton } from 'antd';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const { data: getUserInfo, isError, isLoading, isFetching } = useGetProfileQuery(null, {
        skip: !token,
    });

    // Update token state when it changes
    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        };

        // Listen for changes to localStorage
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Redirect if token is missing
    if (!token) {
        return <Navigate to={'/auth/login'} state={{ from: location }} />;
    }

    // Show loading spinner while fetching profile data
    if (isLoading || isFetching) {
        return <div className="flex items-center justify-center h-screen w-screen"><Skeleton paragraph={{ rows: 15 }} active /></div>;
    }

    // Redirect if there's an error or user is not authorized
    if (isError || !getUserInfo?.data?.result?.email || getUserInfo?.data?.result?.role !== 'ADMIN') {
        return <Navigate to={'/auth/login'} state={{ from: location }} />;
    }

    // Render the children if everything checks out
    return children;
};

export default PrivateRoute;
