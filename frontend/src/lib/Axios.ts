import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "https://localhost:300/api" : "/api",
    withCredentials:true
})