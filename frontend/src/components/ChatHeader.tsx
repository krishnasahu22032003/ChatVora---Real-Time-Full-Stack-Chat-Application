import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineusers } = useAuthStore();

  // ✅ Check if selected user is online
  const isOnline = onlineusers?.includes(selectedUser?._id);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center flex-1 max-h-[84px] px-6 
  bg-gradient-to-b from-slate-900/80 to-slate-800/60 
  border-b border-cyan-500/20 backdrop-blur-md shadow-[0_2px_10px_rgba(56,189,248,0.1)]">

      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full border  border-slate-600">
          <div className="overflow-hidden rounded-full">
            <img
              src={selectedUser?.profilePic || "/avatar.png"}
              alt={selectedUser?.username || "User"}
              className="w-full h-12 object-cover"
            />
          </div>

          {/* ✅ Show green dot only if online */}
          {isOnline && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]"></span>
          )}
        </div>

        {/* User info */}
        <div>
          <h3 className="text-slate-200 font-medium capitalize">
            {selectedUser?.username}
          </h3>
          <p className="text-slate-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Close button */}
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
