import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/usekeyboardsound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isSoundEnabled, sendMessages } = useChatStore();

  const handleSendMessages = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessages({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImages = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-800/70 backdrop-blur-lg bg-[#0d1118]/70">
      {/* 🖼️ Animated image preview */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto mb-4 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl p-3 rounded-xl border border-slate-700/50 shadow-[0_0_15px_rgba(56,189,248,0.08)]"
          >
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-slate-700/50 hover:scale-105 transition-transform"
              />
              <button
                onClick={removeImages}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900/70 flex items-center justify-center text-slate-200 hover:bg-slate-700/80 transition"
                type="button"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 italic ml-3">
              “Ready to upload your masterpiece?”
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💬 Input area */}
      <form
        onSubmit={handleSendMessages}
        className="max-w-3xl mx-auto flex items-center space-x-3 bg-slate-900/40 border border-slate-800/70 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.05)] transition-all"
      >
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* 📷 Image upload button */}
        <motion.button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={`p-2 rounded-xl transition-colors ${
            imagePreview
              ? "text-cyan-400 bg-cyan-400/10 border border-cyan-400/30"
              : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 border border-transparent"
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </motion.button>

        {/* ✏️ Text Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          placeholder="Type something brilliant..."
          className="flex-1 bg-transparent outline-none text-slate-200 placeholder-slate-500 text-sm tracking-wide"
        />

        {/* 🚀 Send Button */}
        <motion.button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          whileTap={{ scale: 0.9 }}
          animate={
            text.trim() || imagePreview
              ? { scale: [1, 1.05, 1], boxShadow: "0 0 12px rgba(56,189,248,0.4)" }
              : {}
          }
          transition={{ repeat: text.trim() || imagePreview ? Infinity : 0, duration: 2 }}
          className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default MessageInput;
