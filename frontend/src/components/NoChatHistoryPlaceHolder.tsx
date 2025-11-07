import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fadeIn">
      {/* Icon */}
      <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-cyan-500/20 to-cyan-400/10 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(56,189,248,0.15)]">
        <MessageCircleIcon className="w-10 h-10 text-cyan-400" />
        <span className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />
      </div>

      {/* Heading */}
      <h3 className="text-xl font-semibold text-slate-200 mb-2">
        Begin your chat with <span className="text-cyan-400">{name}</span> ✨
      </h3>

      {/* Subtext */}
      <p className="text-slate-400 text-sm max-w-md mb-6">
        Every great connection starts with a message — break the silence and send your first one now.
      </p>

      {/* Divider */}
      <div className="h-px w-32 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent mb-6" />

      {/* Quick Start Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {[
          "👋 Hey there!",
          "💫 How’s your day?",
          "🚀 Let’s catch up soon!",
        ].map((text, idx) => (
          <button
            key={idx}
            className="px-5 py-2 text-xs font-medium text-cyan-300 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 hover:text-cyan-100 transition-all duration-200 shadow-[0_0_10px_rgba(56,189,248,0.1)] hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
