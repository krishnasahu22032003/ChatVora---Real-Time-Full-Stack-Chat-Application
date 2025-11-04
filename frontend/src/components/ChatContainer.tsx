import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import ChatHeader from "./ChatHeader"
const ChatContainer = () => {

const{selectedUser,getMessagesByUserId,messages}=useChatStore()
const {authUser}=useAuthStore()
useEffect(()=>{
  getMessagesByUserId(selectedUser._id)
},[getMessagesByUserId,selectedUser])
  return (
  <>
  <ChatHeader/>
  </>
  )
}

export default ChatContainer
