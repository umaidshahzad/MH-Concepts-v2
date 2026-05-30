import { Navigate } from 'react-router';

export const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
        return <Navigate to="/adminlogin" replace />;
    }
    return children;
};