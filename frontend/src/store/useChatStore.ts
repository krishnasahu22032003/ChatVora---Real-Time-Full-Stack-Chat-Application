import { create } from "zustand";
import { AxiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

interface ChatStore {
  allContacts: any[];
  chats: any[];
  messages: any[];
  activeTab: string;
  selectedUser: any | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;
  sendMessages: (messageData: { text?: string; image?: string | null }) => Promise<void>;

  getAllContacts: () => Promise<void>;
  getMyChatPartner:()=>void;
  getMessagesByUserId:(userId : string)=>void;
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


  },

getMessagesByUserId:async (userId: string)=>{
  set({isMessagesLoading:true})
  try{
    const res =  await AxiosInstance.get(`/messages/${userId}`)
    set({messages:res.data})
  }catch(e:any){
   toast.error((e.response?.data?.message)||"Something went wrong")
  }finally{
set({isMessagesLoading:false})
  }
},

sendMessages: async (messageData :{ text?: string; image?: string | null })=>{
 const{ authUser} =  useAuthStore.getState()
const {selectedUser,messages} = get()

const tempId = `temp-${Date.now}`

const optimisticMessage = {_id:tempId,
  senderId:authUser?._id,
  receiverId:selectedUser._id,
  text:messageData.text,
  image:messageData.image,
  createdAt:new Date().toISOString(),
  isOptimistic:true,
}
set({messages:[...messages,optimisticMessage]})
try{
const res = await AxiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
set({messages:messages.concat(res.data)})
}catch(e:any ){
  set({messages:messages})
  toast.error((e.response?.data?.message)||"Something went wrong")
}
}



}));
