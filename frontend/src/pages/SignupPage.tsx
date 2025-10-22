import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import { Link } from "react-router";

const SignupPage = () => {
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningup } = useAuthStore();

  // password validation checks
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
    signup({
      username: formData.fullname,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="w-full flex items-center justify-center p-4 min-h-screen bg-[radial-gradient(circle_at_top_left,#0a0b11_0%,#04050a_50%,#020309_100%)] relative overflow-hidden">
      {/* Subtle glowing overlay for premium ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,255,255,0.08)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <div className="w-full flex flex-col md:flex-row rounded-3xl overflow-hidden border border-cyan-400/10 backdrop-blur-xl shadow-[0_0_60px_rgba(56,189,248,0.15)] bg-[#0b0d16]/70 relative">
          {/* Elegant top ambient glow */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>

          {/* LEFT - FORM */}
          <div className="md:w-1/2 p-10 flex items-center justify-center border-r border-slate-700/30 bg-[#0b0d16]/90">
            <div className="w-full max-w-md">
              {/* HEADER */}
              <div className="text-center mb-10">
                <div className="relative inline-block">
                  <MessageCircleIcon className="w-14 h-14 mx-auto text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)] animate-pulse" />
                  <div className="absolute inset-0 blur-xl bg-cyan-400/20 rounded-full -z-10"></div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-wide">
                  Create Account
                </h2>
                <p className="text-slate-400">Join <span className="text-cyan-400 font-semibold">ChatVora</span> — where conversations come alive</p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* FULL NAME */}
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 text-cyan-400" />
                    <input
                      type="text"
                      required
                      value={formData.fullname}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e101d] text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all duration-300 shadow-inner"
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Email</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 text-cyan-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e101d] text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all duration-300 shadow-inner"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-cyan-300 mb-2 font-medium">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-3 text-cyan-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0e101d] text-white border border-cyan-500/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all duration-300 shadow-inner"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-cyan-400 hover:text-pink-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Rules */}
                  {formData.password && (
                    <div className="mt-3 space-y-1 text-sm">
                      {Object.entries(passwordChecks).map(([rule, valid]) => (
                        <div key={rule} className="flex items-center gap-2">
                          {valid ? (
                            <CheckCircle2Icon className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircleIcon className="w-4 h-4 text-pink-400" />
                          )}
                          <span className={valid ? "text-slate-300" : "text-slate-500"}>
                            {rule === "length"
                              ? "At least 8 characters"
                              : rule === "uppercase"
                              ? "One uppercase letter"
                              : rule === "lowercase"
                              ? "One lowercase letter"
                              : rule === "number"
                              ? "One number"
                              : "One special character"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  disabled={isSigningup || !allValid}
                  className={`w-full py-3 rounded-xl font-semibold text-black transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.3)] ${
                    allValid
                      ? "bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400"
                      : "bg-slate-700/40 cursor-not-allowed text-slate-400"
                  }`}
                  type="submit"
                >
                  {isSigningup ? (
                    <LoaderIcon className="mx-auto h-5 w-5 animate-spin text-cyan-300" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-cyan-300">
                <Link
                  to="/login"
                  className="hover:text-pink-400 transition-colors duration-300"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT - IMAGE + BADGES */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-tr from-[#0b0d16]/60 via-[#0a0c18]/30 to-transparent relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]"></div>
            <div className="relative">
              <img
                src="/chat.png"
                alt="Signup illustration"
                className="w-[420px] h-auto object-contain mx-auto drop-shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:scale-105 transition-transform duration-700"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-cyan-300 tracking-wide">
                  Start Your Journey Today
                </h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="px-4 py-1 rounded-full text-cyan-300 bg-cyan-400/20 text-sm backdrop-blur-sm border border-cyan-400/10">
                    Free
                  </span>
                  <span className="px-4 py-1 rounded-full text-pink-300 bg-pink-400/20 text-sm backdrop-blur-sm border border-pink-400/10">
                    Easy Setup
                  </span>
                  <span className="px-4 py-1 rounded-full text-purple-300 bg-purple-400/20 text-sm backdrop-blur-sm border border-purple-400/10">
                    Private
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default SignupPage;
