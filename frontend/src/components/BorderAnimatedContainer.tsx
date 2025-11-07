import type React from "react";
import { motion } from "framer-motion";

function BorderAnimatedContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        relative w-full h-full p-[1.5px] rounded-2xl
        bg-[conic-gradient(from_0deg,#14b8a6,#8b5cf6,#ec4899,#14b8a6)]
        animate-[borderRotate_8s_linear_infinite]
        shadow-[0_0_25px_rgba(56,189,248,0.1)]
        overflow-hidden
      "
    >
      <div
        className="
          w-full h-full rounded-2xl
          bg-gradient-to-br from-[#0d1017]/95 via-[#0f131b]/95 to-[#111722]/95
          backdrop-blur-xl
          border border-[#1a1d27]/70
          flex items-center justify-center
          transition-all duration-300
          hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]
        "
      >
        {children}
      </div>
    </motion.div>
  );
}

export default BorderAnimatedContainer;
