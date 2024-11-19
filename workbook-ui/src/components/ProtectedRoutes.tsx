import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }: { component: React.ComponentType }) => {
    const token = localStorage.getItem('token');
    return token ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
