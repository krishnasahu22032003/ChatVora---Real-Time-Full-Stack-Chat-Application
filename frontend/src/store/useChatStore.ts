import { create } from "zustand";

interface ChatStore {
  allContacts: any[];
  chats: any[];
  messages: any[];
  activeTab: string;
  selectedUser: any | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;

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
}));
