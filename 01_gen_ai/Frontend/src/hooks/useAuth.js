import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { register, login, logout, getMe } from "../services/auth.api.js";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async ({username, email, password}) => {
        setLoading(true);
        const data = await register({username, email, password});

        setUser(data.user);
        setLoading(false)
    };

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        const data = await login({ email, password });

        setUser(data.user);
        setLoading(false);
    };

    const handleLogout = async () => {
        setLoading(true);
        const data = await logout();
        setUser(null);
        setLoading(false);
    };

    return {user, loading, handleRegister, handleLogin, handleLogout};

};