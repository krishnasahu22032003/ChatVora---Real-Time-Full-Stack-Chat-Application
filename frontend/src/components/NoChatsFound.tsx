import { MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-16 text-center space-y-5"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full flex items-center justify-center 
                   bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),rgba(12,18,28,0.9))]
                   border border-cyan-500/20 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
      >
        <MessageCircleIcon className="w-10 h-10 text-cyan-400/90" />
      </motion.div>

      <div>
        <h4 className="text-slate-100 font-semibold text-lg tracking-wide mb-2">
          No Signals Detected
        </h4>
        <p className="text-slate-400/90 text-sm max-w-xs mx-auto leading-relaxed">
          Your chat universe is quiet. Connect with someone and start transmitting your first message.
        </p>
      </div>

      <motion.button
        onClick={() => setActiveTab("contacts")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="px-5 py-2.5 text-sm font-medium rounded-lg
                   bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10
                   border border-cyan-500/20 
                   text-cyan-400 hover:text-cyan-300
                   hover:bg-cyan-500/15 
                   transition-all duration-300
                   shadow-[0_0_15px_rgba(56,189,248,0.08)]"
      >
        Start a New Connection
      </motion.button>
    </motion.div>
  );
}

export default NoChatsFound;
