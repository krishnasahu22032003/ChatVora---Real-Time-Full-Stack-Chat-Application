import { create } from "zustand"
import { AxiosInstance } from "../lib/Axios";


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await AxiosInstance.get("/user/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in AuthCheck", (error as Error).message)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }

    }
}));