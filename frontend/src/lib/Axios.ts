import axios from "axios";

const AxiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "https://localhost:300/api" : "/api",
    withCredentials:true
})