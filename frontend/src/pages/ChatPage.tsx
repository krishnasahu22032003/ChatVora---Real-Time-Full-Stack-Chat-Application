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
    <div className="relative w-full max-w-7xl h-[800px] mx-auto flex bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/40 shadow-lg shadow-cyan-500/10">
      {/* Left Side */}
      <div className="w-80 flex flex-col bg-slate-800/60 border-r border-slate-700/40">
        <BorderAnimatedContainer>
          <div className="flex flex-col h-full">
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-3">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col bg-slate-900/70">
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
};

export default ChatPage;
