import { create } from "zustand";
import { AxiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

interface ChatStore {
  allContacts: any[];
  chats: any[];
  messages: any[];
  activeTab: string;
  selectedUser: any | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;
    getAllContacts: () => Promise<void>;
  getMyChatPartner:()=>void
  toggleSound: () => void;
  setActiveTab: (tab: string) => void;
  setSelectedUser: (selectedUser: any | null) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,


  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;

    localStorage.setItem("isSoundEnabled", String(newValue));
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab: string) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser: any | null) => set({ selectedUser }),
  getAllContacts: async () => {
  set({ isUsersLoading: true });
  try {
    const res = await AxiosInstance.get("/messages/contacts");

    // ✅ Safely extract users array from response
    const users = Array.isArray(res.data?.users) ? res.data.users : [];

    set({ allContacts: users });
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    toast.error(error.response?.data?.message || "Failed to load contacts");
    set({ allContacts: [] });
  } finally {
    set({ isUsersLoading: false });
  }
},
  getMyChatPartner: async () => {
    set({ isUsersLoading: true })
    try {
      const res = await AxiosInstance.get("/messages/chats")
      set({ chats: res.data })
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false })
    }


  }
}));
