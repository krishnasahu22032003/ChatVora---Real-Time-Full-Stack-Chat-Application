import { XIcon } from "lucide-react"
import { useChatStore } from "../store/useChatStore"
import { useEffect } from "react"

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUser(null)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [setSelectedUser])

  return (
    <div className="flex justify-between items-center bg-slate-800/80 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt={selectedUser?.username || "User"}
            className="w-12 h-12 rounded-full object-cover border border-slate-600"
          />
          {/* Online indicator dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>
        </div>

        {/* User info */}
        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser?.username}</h3>
          <p className="text-slate-400 text-sm">Online</p>
        </div>
      </div>

      {/* Close button */}
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  )
}

export default ChatHeader
