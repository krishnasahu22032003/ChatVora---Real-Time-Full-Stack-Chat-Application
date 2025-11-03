// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AxiosInstance } from "../lib/Axios";
import axios from "axios";
import toast from "react-hot-toast";

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  ProfilePic?: string | null; 
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface UpdateProfileData {
  ProfilePic?: string | null; 
}

interface AuthState {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningup: boolean;
  isLoggingIn: boolean;
  signup: (data: SignUpRequest) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null,
      isCheckingAuth: true,
      isSigningup: false,
      isLoggingIn: false,

      // ✅ Check if user is authenticated
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await AxiosInstance.get<AuthUser>("/user/check");
          set({ authUser: res.data });
        } catch (error) {
          console.error("Auth check failed:", (error as Error).message);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // ✅ Signup function
      signup: async (data: SignUpRequest) => {
        set({ isSigningup: true });
        try {
          await AxiosInstance.post("/user/signup", data);
          toast.success("Account Created Successfully!");
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data?.message || "Something went wrong!");
          } else if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error("An unknown error occurred");
          }
        } finally {
          set({ isSigningup: false });
        }
      },

      // ✅ Login function
      login: async (data: LoginRequest) => {
        set({ isLoggingIn: true });
        try {
          const res = await AxiosInstance.post<AuthUser>("/user/signin", data);
          set({ authUser: res.data });
          toast.success("Logged in Successfully!");
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data?.message || "Login failed!");
          } else if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error("An unknown error occurred");
          }
        } finally {
          set({ isLoggingIn: false });
        }
      },

      // ✅ Logout function
      logout: async () => {
        try {
          await AxiosInstance.post("/user/logout");
          set({ authUser: null });
          toast.success("Logged out successfully!");
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            toast.error(e.response?.data?.message || "Logout failed!");
          } else if (e instanceof Error) {
            toast.error(e.message);
          } else {
            toast.error("An unknown error occurred");
          }
        }
      },

      // ✅ Update Profile Picture (Cloudinary)
      updateProfile: async (data: UpdateProfileData): Promise<void> => {
        try {
          const res = await AxiosInstance.put("/user/UpdateProfile", data);
          // Merge the updated profile with existing user info
          set((state) => ({
            authUser: { ...state.authUser, ...res.data },
          }));
          toast.success("Profile updated successfully");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log("Error in update profile:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
          } else {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred");
          }
        }
      },
    }),
    {
      name: "auth-storage", // ✅ LocalStorage key name
      partialize: (state) => ({ authUser: state.authUser }), // only persist authUser
    }
  )
);
