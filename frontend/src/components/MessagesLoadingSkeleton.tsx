function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} w-full`}
        >
          <div
            className={`
              relative rounded-2xl px-5 py-3 
              ${index % 2 === 0 ? "bg-slate-800" : "bg-cyan-700/50"} 
              text-white animate-pulse
              shadow-[0_0_20px_rgba(0,0,0,0.3)]
              ${index % 2 === 0 ? "rounded-bl-none" : "rounded-br-none"}
            `}
            style={{
              width: `${Math.floor(Math.random() * 80) + 100}px`,
              height: `${Math.floor(Math.random() * 20) + 20}px`,
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;
