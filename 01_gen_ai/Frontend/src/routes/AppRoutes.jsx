import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.jsx"
import Register from "../pages/Register.jsx"
import Home from "../pages/Home.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Interview from "../pages/Interview.jsx";


export const AppRoutes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
    },
    {
        path: "/interview/:interviewId",
        element: <ProtectedRoutes><Interview /></ProtectedRoutes>
    }
]);