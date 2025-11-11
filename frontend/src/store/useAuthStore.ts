import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AxiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

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
  socket: Socket | null;
  onlineusers: string[];
  isCheckingAuth: boolean;
  isSigningup: boolean;
  isLoggingIn: boolean;
  hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;
  checkAuth: () => Promise<void>;
  signup: (data: SignUpRequest) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  ConnectSocket: () => void;
  DisconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      authUser: null,
      socket: null,
      onlineusers: [],
      isCheckingAuth: false, // ✅ start as false (don’t block hydration)
      isSigningup: false,
      isLoggingIn: false,
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      // ✅ Check Auth (called only after hydration)
     checkAuth: async () => {
  set({ isCheckingAuth: true });
  try {
    const res = await AxiosInstance.get<AuthUser>("/user/check");
    set({ authUser: res.data });
    get().ConnectSocket();
  } catch (err: any) {
    // don't blindly clear persisted authUser on transient errors
    // if server returned 401 then clear; otherwise keep persisted value
    if (err?.response?.status === 401) {
      set({ authUser: null });
    } else {
      console.warn("checkAuth failed, keeping persisted authUser if present:", err);
    }
  } finally {
    set({ isCheckingAuth: false });
  }
},

      // ✅ Signup
      signup: async (data) => {
        set({ isSigningup: true });
        try {
          await AxiosInstance.post("/user/signup", data);
          toast.success("Account created successfully!");
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Signup failed!");
        } finally {
          set({ isSigningup: false });
        }
      },

// inside useAuthStore: replace the existing `login` implementation with this
login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await AxiosInstance.post("/user/signin", data);

    // If signin returns a full user object, use it. Otherwise, fetch via checkAuth.
    // (This covers both server implementations.)
    if (res?.data && typeof res.data === "object" && res.data.username) {
      set({ authUser: res.data });
      // connect socket after authUser is set
      get().ConnectSocket();
    } else {
      // Signin didn't return user object => call checkAuth to get it
      await get().checkAuth();
    }

    toast.success("Logged in successfully!");
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Login failed!");
  } finally {
    set({ isLoggingIn: false });
  }
},

      // ✅ Logout
      logout: async () => {
        try {
          await AxiosInstance.post("/user/logout");
          set({ authUser: null });
          toast.success("Logged out successfully!");
          get().DisconnectSocket();
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Logout failed!");
        }
      },

      // ✅ Update Profile
      updateProfile: async (data) => {
        try {
          const res = await AxiosInstance.put("/user/UpdateProfile", data);
          set((s) => ({ authUser: { ...s.authUser!, ...res.data } }));
          toast.success("Profile updated successfully!");
        } catch (err: any) {
          toast.error(err.response?.data?.message || "Update failed!");
        }
      },

      // ✅ Socket
      ConnectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, { withCredentials: true });
        socket.on("GetOnlineUsers", (userIds) => set({ onlineusers: userIds }));
        socket.connect();
        set({ socket });
      },

      DisconnectSocket: () => {
        if (get().socket?.connected) get().socket?.disconnect();
      },
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({ authUser: state.authUser }),
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error("Hydration error:", error);
        if (state) state.setHasHydrated(true); // ✅ crucial fix
      },
    }
  )
);
