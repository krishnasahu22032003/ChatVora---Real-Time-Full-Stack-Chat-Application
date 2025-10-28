import type React from "react";

function BorderAnimatedContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      relative w-full h-full p-0.5 rounded-2xl
      bg-[conic-gradient(from_var(--border-angle),#06b6d4_0deg,#ec4899_120deg,#8b5cf6_240deg,#06b6d4_360deg)]
      animate-borderGlow
    ">
      {/* Inner Content Area */}
      <div className="
        w-full h-full rounded-2xl
        bg-[#0b0d16]/90
        backdrop-blur-xl
        border border-slate-700/30
        shadow-[0_0_40px_rgba(56,189,248,0.15)]
        flex items-center justify-center
        overflow-hidden
      ">
        {children}
      </div>
    </div>
  );
}

export default BorderAnimatedContainer;
