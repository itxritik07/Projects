// import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js'
import { Navigate } from "react-router";


const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-2xl font-semibold text-blue-600 animate-pulse">
                    Loading...
                </h1>
            </main>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children
}

export default ProtectedRoutes;