import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  // Password validation
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };
  const allValid = Object.values(passwordChecks).every(Boolean);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allValid) return;
    login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0b11] font-sans">

      {/* Main Container */}
      <div className="relative w-full max-w-6xl md:h-[800px] h-auto z-10 mt-8 ">
        <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden border border-cyan-400/10 backdrop-blur-xl shadow-[0_0_60px_rgba(56,189,248,0.15)] bg-[#0b0d16]/80 relative">

          {/* LEFT FORM */}
          <div className="md:w-1/2 p-10 flex flex-col justify-between border-r border-slate-700/30 bg-[#0b0d16]/90">
            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative inline-block"
                >
                  <MessageCircleIcon className="w-14 h-14 mx-auto text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] animate-pulse" />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full -z-10"></div>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight mb-2 tracking-wide">
                  Elevate Your Conversations
                </h2>
                <p className="text-slate-400 mt-3 text-[15px] leading-relaxed">
                  Build meaningful connections with <span className="text-cyan-400 font-semibold">ChatVora</span> — where conversations come alive.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
               
                {/* Email */}
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Email</label>
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <MailIcon className="absolute left-3 top-3 text-cyan-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e101d] text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all duration-300 shadow-inner focus:scale-[1.02]"
                      placeholder="Email"
                    />
                  </motion.div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Password</label>
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <LockIcon className="absolute left-3 top-3 text-cyan-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0e101d] text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all duration-300 shadow-inner focus:scale-[1.02]"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-cyan-400 hover:text-pink-400 transition-colors"
                    >
                      {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </motion.div>

                  {/* Password Rules Inline */}
                  {formData.password && (
                    <div className="mt-3  flex  gap-2 text-sm">
                      {Object.entries(passwordChecks).map(([rule, valid]) => (
                        <div
                          key={rule}
                          className={`flex flex-wrap items-center gap-1 ${
                            valid ? "text-cyan-400" : "text-slate-500"
                          }`}
                        >
                          {valid ? (
                            <CheckCircle2Icon className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <XCircleIcon className="w-4 h-4 text-slate-500" />
                          )}
                          {rule === "length"
                            ? "Minimum 8 characters"
                            : rule === "uppercase"
                            ? "At least 1 uppercase letter"
                            : rule === "lowercase"
                            ? "At least 1 lowercase letter"
                            : rule === "number"
                            ? "At least 1 number"
                            : "At least 1 special character"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-5">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(56,189,248,0.4)" }}
                    whileTap={{ scale: 0.98, boxShadow: "0 0 15px rgba(56,189,248,0.2)" }}
                    disabled={isLoggingIn || !allValid}
                    className={`w-full py-3 rounded-xl font-semibold text-black transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] ${
                      allValid
                        ? "bg-linear-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400"
                        : "bg-slate-700/40 cursor-not-allowed text-slate-400"
                    }`}
                    type="submit"
                  >
                    {isLoggingIn ? <LoaderIcon className="mx-auto h-5 w-5 animate-spin text-cyan-300" /> :  <span className="text-lg" >Login</span> }
                  </motion.button>

                  <div className="mt-3 text-center text-cyan-300 text-[14px]">
                    <Link to="/signup" className="hover:text-pink-400 transition-colors duration-300">
                   Don't have an account? Create Account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 relative">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] rounded-full blur-xl"></div>
              <img
                src="/chat.png"
                alt="Signup illustration"
                className="w-[420px] h-auto object-contain mx-auto drop-shadow-[0_0_50px_rgba(56,189,248,0.3)] hover:scale-105 transition-transform duration-700"
              />
              <div className="mt-6 text-center">
                <h3 className="text-3xl font-extrabold text-cyan-400 tracking-wide mb-3">
                  Connect. Converse. Create.
                </h3>
                <div className="mt-4 flex justify-center gap-4 flex-wrap">
                  <motion.span whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56,189,248,0.3)" }} className="px-5 py-2 rounded-full text-cyan-300 bg-white/5 backdrop-blur-md border border-cyan-500/10 shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all duration-300">
                    Real-Time Chat
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236,72,153,0.3)" }} className="px-5 py-2 rounded-full text-pink-300 bg-white/5 backdrop-blur-md border border-pink-400/10 shadow-[0_0_15px_rgba(236,72,153,0.15)] transition-all duration-300">
                    End-to-End Encrypted
                  </motion.span>
                  <motion.span whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139,92,246,0.3)" }} className="px-5 py-2 rounded-full text-purple-300 bg-white/5 backdrop-blur-md border border-purple-400/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300">
                    Smart & Intuitive
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
