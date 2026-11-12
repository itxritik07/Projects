import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { register, login, logout, getMe } from "../services/auth.api.js";


export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        }
        catch (error) {
            // console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ email, password }) => {
        setLoading(true);

        try {
            const data = await login({ email, password });
            setUser(data.user);
        }
        catch (error) {

        }
        finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);

        try {
            const data = await logout();
            setUser(null);
        } catch (error) {

        }
        finally {
            setLoading(false);
        }
    };

    return { user, loading, handleRegister, handleLogin, handleLogout };
};