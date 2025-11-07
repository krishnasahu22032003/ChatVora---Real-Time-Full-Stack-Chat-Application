import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatList = () => {
  const { getMyChatPartner, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineusers } = useAuthStore();

  useEffect(() => {
    getMyChatPartner();
  }, [getMyChatPartner]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-3 p-3">
      {chats.map((chat) => {
        const isOnline = onlineusers?.includes(chat._id);

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className="group flex items-center gap-3 bg-[#0e111a]/60 border border-white/5 
                       hover:bg-[#0e111a]/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]
                       rounded-xl p-2.5 cursor-pointer transition-all duration-300"
          >
            {/* Avatar */}
      <div className="relative group">
  <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-slate-700/60 hover:ring-slate-500/70 transition-all">
    <img
      src={chat.profilePic || "/avatar.png"}
      alt={chat.username}
      className="w-full h-full object-cover"
    />
  </div>

  {isOnline && (
    <span className="absolute top-0 right-1 block w-3 h-3 bg-green-500 border-2 border-[#0e111a] rounded-full"></span>
  )}
</div>


            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-medium truncate group-hover:text-cyan-300 transition-colors duration-300">
                {chat.username}
              </h4>
              <p className="text-slate-400/80 text-sm font-light truncate">Tap to start conversation</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
