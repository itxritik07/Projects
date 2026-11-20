import axios from 'axios';

// base url for short and clean code
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});


/**
 * @description register a new user, expects username, email and password in the request body
 */
export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post("/api/auth/register", {
            username, email, password
        });
        return response.data;
    }
    catch (error) {
        console.log("register error:  ", error)
    }
};


/**
 * @description login a user, expects email and password in the request body
 */
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });
        return response.data;
    }
    catch (error) {
        console.log("login ", error)
    }
};


/**
 * @description clear token from user cookie and add the token in blacklist
 */
export const logout = async () => {
    try {
        const response = await api.post("/api/auth/logout");
        return response.data;
    }
    catch (error) {
        console.log("logout ", error)
    }
};


/**
 * @description get the current logged in user details.
 */
export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    }
    catch (error) {
        // console.log("getMe error:", error)
    }
};