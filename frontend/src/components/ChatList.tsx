import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatList = () => {
  const { getMyChatPartner, chats, isUsersLoading, setSelectedUser } = useChatStore();

  useEffect(() => {
    getMyChatPartner();
  }, [getMyChatPartner]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-3 p-3">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className="flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/40 border border-slate-700/60 rounded-xl p-3 transition-all cursor-pointer shadow-md hover:shadow-cyan-500/20"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/40">
            <img
              src={chat.profilePic || "/avatar.png"}
              alt={chat.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-100 font-semibold truncate">{chat.fullName}</h4>
            <p className="text-slate-400 text-sm truncate">Tap to chat</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
