import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import ChatHeader from "./ChatHeader"
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder"
const ChatContainer = () => {

const{selectedUser,getMessagesByUserId,messages}=useChatStore()
const {authUser}=useAuthStore()
useEffect(()=>{
  getMessagesByUserId(selectedUser._id)
},[getMessagesByUserId,selectedUser])
  return (
  <>
  <ChatHeader/>
  <div className="flex-1 px-6 overflow-y-auto py-8">
    {messages.length>0?(<p>some messages</p>):(<NoChatHistoryPlaceHolder name={selectedUser.username}/>)}

  </div>
  </>
  )
}

export default ChatContainer
