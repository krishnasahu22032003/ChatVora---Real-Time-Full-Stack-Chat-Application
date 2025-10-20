import { create } from "zustand"
import { AxiosInstance } from "../lib/Axios";


interface AuthUser {
  _id: string;
  username: string;
  email: string;
  // add other fields you have in your user model
}

interface AuthState {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async () => {
         
        try {
            const res = await AxiosInstance.get<AuthUser>("/user/check")
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in AuthCheck", (error as Error).message)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }

    }
}));