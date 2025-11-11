import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

interface ChatContainerProps {
  onBack?: () => void; // ✅ added optional onBack for mobile
}

const ChatContainer = ({ onBack }: ChatContainerProps) => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex rounded-2xl flex-col h-full bg-[#0b0f18] relative">
      {/* ✅ Mobile back button (hidden on desktop) */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:hidden z-20 text-cyan-400 hover:text-cyan-300 
                     transition-colors duration-200"
        >
          ←
        </button>
      )}

      <ChatHeader />

      {/* ✅ Scrollable chat area */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto relative scrollbar-hidden mt-1"
      >
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isOwnMessage = msg.senderId === authUser?._id;
                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[70%] rounded-2xl px-4 py-3 transition-all duration-200 backdrop-blur-sm
                        ${
                          isOwnMessage
                            ? "bg-gradient-to-br from-cyan-600/90 to-cyan-400/40 text-white border border-cyan-500/20 shadow-[0_0_15px_rgba(56,189,248,0.25)] rounded-br-none"
                            : "bg-gradient-to-br from-slate-800/90 to-slate-900/60 text-slate-200 border border-slate-700/40 shadow-[0_0_12px_rgba(56,189,248,0.1)] rounded-bl-none"
                        }`}
                    >
                      {msg.image && (
                        <motion.img
                          src={msg.image}
                          alt="shared"
                          className="rounded-lg h-48 object-cover mb-2 border border-cyan-500/20 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                      )}

                      {msg.text && (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed tracking-wide">
                          {msg.text}
                        </p>
                      )}

                      <p
                        className={`text-[11px] mt-1 opacity-70 ${
                          isOwnMessage ? "text-cyan-200" : "text-slate-400"
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser?.username || "this user"} />
        )}

        {/* Subtle cosmic overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.05),transparent_70%)]" />
      </div>

      <div className="border-t border-slate-800/70 backdrop-blur-md bg-slate-950/60">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
