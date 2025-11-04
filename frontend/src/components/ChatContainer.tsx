import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect } from "react"
import ChatHeader from "./ChatHeader"
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder"

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages } = useChatStore()
  const { authUser } = useAuthStore()

  useEffect(() => {
    getMessagesByUserId(selectedUser._id)
  }, [getMessagesByUserId, selectedUser])

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 bg-slate-950">
        {messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === authUser?._id
              return (
                <div
                  key={msg._id}
                  className={`flex w-full ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative max-w-[70%] rounded-2xl px-4 py-3 shadow-md transition-all duration-200 ${
                      isOwnMessage
                        ? "bg-cyan-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="shared"
                        className="rounded-lg h-48 object-cover mb-2"
                      />
                    )}

                    {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}

                    <p
                      className={`text-xs mt-1 opacity-70 ${
                        isOwnMessage ? "text-cyan-200" : "text-slate-400"
                      }`}
                    >
                      {new Date(msg.createdAt).toISOString().slice(11, 16)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser.username} />
        )}
      </div>
      <MessageInput/>
    </>
  )
}

export default ChatContainer
