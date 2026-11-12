import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Home from "../pages/Home.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";


export const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
]);