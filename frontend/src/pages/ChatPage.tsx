import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div
      className="relative w-full max-w-6xl h-[700px] mx-auto flex rounded-2xl overflow-hidden 
                 bg-gradient-to-br from-[#0d1017] via-[#0f131b] to-[#111722] 
                 border border-[#1a1d27]/70 backdrop-blur-xl 
                 shadow-[0_0_40px_rgba(56,189,248,0.07)] transition-all duration-500"
    >
      {/* Left Side */}
      <div className="w-80 flex flex-col border-r border-[#1a1d27]/70 bg-[#10131a]/60 backdrop-blur-xl">
        <BorderAnimatedContainer>
          <div className="flex flex-col h-full">
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-slate-700/40 hover:scrollbar-thumb-slate-600/50 transition-all">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col h-full bg-[#0f121a]/70 backdrop-blur-xl border-l border-[#1a1d27]/70 transition-all overflow-hidden">
        <div className="flex-1 min-h-0"> 
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
