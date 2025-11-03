import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex items-center justify-center gap-3 p-2">
      {["chats", "contacts"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 rounded-xl font-medium capitalize transition-all duration-300
            ${
              activeTab === tab
                ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-400/10"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ActiveTabSwitch;
