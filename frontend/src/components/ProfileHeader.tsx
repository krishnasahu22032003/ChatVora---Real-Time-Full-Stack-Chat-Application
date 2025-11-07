import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const result = reader.result;
      if (typeof result === "string") {
        setSelectedImg(result);
        await updateProfile({ ProfilePic: result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <header className="border-b rounded-2xl border-slate-700/40 bg-linear-to-r from-[#0e111a] to-[#131722] p-5 mt-2 flex items-center justify-between">
      {/* LEFT: Profile */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative group">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="size-14 rounded-full overflow-hidden ring-1 ring-slate-700/60 hover:ring-slate-500/70 transition-all"
          >
            <img
              src={
                selectedImg ||
                authUser?.ProfilePic?.toString() ||
                "/avatar.png"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-medium transition-opacity">
              Change
            </div>
          </button>

          <span className="absolute top-0 right-1 block w-3 h-3 bg-green-500 border-2 border-[#0e111a] rounded-full"></span>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-slate-100 font-semibold text-lg tracking-wide">
            {authUser?.username || "Unknown User"}
          </h3>
          <p className="text-slate-400 text-xs">Online</p>
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch(() => {});
            toggleSound();
          }}
          className="p-2 ml-1 rounded-md hover:bg-slate-700/30 text-slate-400 hover:text-slate-200 transition-all"
          title="Toggle Sound"
        >
          {isSoundEnabled ? (
            <Volume2Icon className="size-5" />
          ) : (
            <VolumeOffIcon className="size-5" />
          )}
        </button>

        <button
          onClick={logout}
          className="p-2 rounded-md hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 transition-all"
          title="Logout"
        >
          <LogOutIcon className="size-5" />
        </button>
      </div>
    </header>
  );
}

export default ProfileHeader;
