import { MessageCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const NoConversationPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full text-center space-y-6 px-6"
    >
      {/* Animated Glowing Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full flex items-center justify-center 
                   bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),rgba(12,18,28,0.9))]
                   border border-cyan-500/25 shadow-[0_0_35px_rgba(56,189,248,0.15)]"
      >
        <MessageCircleIcon className="w-12 h-12 text-cyan-400/90 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]" />
      </motion.div>

      {/* Text Section */}
      <div>
        <h3 className="text-xl font-semibold text-slate-100 tracking-wide mb-2">
          No transmissions yet 🚀
        </h3>
        <p className="text-slate-400/90 text-sm max-w-sm mx-auto leading-relaxed">
          Select a contact from the sidebar and spark your next intergalactic conversation.
        </p>
      </div>

      {/* Optional Motion Accent */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="h-[1px] w-40 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent rounded-full"
      />
    </motion.div>
  );
};

export default NoConversationPlaceholder;
