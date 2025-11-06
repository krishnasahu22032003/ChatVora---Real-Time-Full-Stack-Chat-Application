import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineusers } = useAuthStore(); // ✅ make sure to call it as a function

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  const contactsArray = Array.isArray(allContacts) ? allContacts : [];

  return (
    <div className="space-y-3">
      {contactsArray.length === 0 ? (
        <p className="text-slate-400 text-center">No contacts found</p>
      ) : (
        contactsArray.map((contact) => {
          const isOnline = onlineusers?.includes(contact._id); // ✅ check online status

          return (
            <div
              key={contact._id}
              className="flex items-center gap-4 bg-slate-800/50 hover:bg-cyan-500/10 rounded-xl p-3 cursor-pointer transition-all"
              onClick={() => setSelectedUser(contact)}
            >
              <div className="relative">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.username || "User"}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700"
                />

                {/* ✅ Online Indicator Dot */}
                {isOnline && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>
                )}
              </div>

              <div>
                <h4 className="text-slate-100 font-semibold capitalize">
                  {contact.username}
                </h4>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ContactList;
