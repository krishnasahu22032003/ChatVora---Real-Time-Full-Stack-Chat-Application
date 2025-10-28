import {  useAuthStore } from "../store/useAuthStore"

const ChatPage = () => {

const {logout} = useAuthStore()


  return (
    <div className="z-10">
 <button className="text-white bg-red cursor-pointer border-gray-200" onClick={logout}> logout</button>
    </div>
  )
}

export default ChatPage
