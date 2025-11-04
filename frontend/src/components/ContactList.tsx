import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();

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
        contactsArray.map((contact) => (
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
     
            </div>

            <div>
              <h4 className="text-slate-100 font-semibold capitalize">
                {contact.username}
              </h4>
             
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ContactList;
