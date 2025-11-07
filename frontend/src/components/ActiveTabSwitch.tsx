import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
<div className="flex items-center justify-center gap-4 p-3 rounded-xl border-slate-700/40 bg-linear-to-r from-[#0e111a] to-[#131722] ">

  {["chats", "contacts"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2.5 rounded-lg font-medium capitalize transition-all duration-300
        ${
          activeTab === tab
            ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
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
