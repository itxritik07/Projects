import axios from 'axios';

// base url for short and clean code
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

// registerUserController()
export const register = async ({username, email, password}) => {
    try {
        const response = await api.post("/api/auth/register", {
            username, email, password
        });

        return response.data;
    } catch (error) {
        console.log(error)
    }
};


// loginUserController()
export const login = async ({email, password}) => {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });

        return response.data;
    } catch (error) {
        console.log(error)
    }
};


// logoutUserController()
export const logout = async () => {
    try {
        const response = await api.post("/api/auth/logout");

        return response.data;
    } catch (error) {
        console.log(error)
    }
};


// getMeController()
export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");

        return response.data;
    } 
    catch (error) {
        console.log(error)
    }
};