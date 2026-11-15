import axios from "axios";

// base url for short and clean code
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const generateInterviewReport = async ({ selfDescription, jobDescription, resumeFile }) => {
    const formData = new FormData()
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resumeFile)
};