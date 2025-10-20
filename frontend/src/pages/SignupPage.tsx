import  { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from 'react-router';

const SignupPage = () => {
    const [formData , setformData] = useState({fullname:"",email:"",password:""})
    const {signup,isSigningup} = useAuthStore()
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault();
  e.preventDefault();
     signup({
    username: formData.fullname, // map fullname to username
    email: formData.email,
    password: formData.password,
  });
    }
  return (
    <div className="w-full flex items-center justify-center p-4 bg-[radial-gradient(circle_at_top_left,#0b0d16_0%,#05060b_40%,#03040a_100%)]">
  <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
    <div className="w-full flex flex-col md:flex-row">
      {/* FORM COLUMN - LEFT SIDE */}
      <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-700/30">
        <div className="w-full max-w-md">
          {/* HEADING TEXT */}
          <div className="text-center mb-8">
            <MessageCircleIcon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400">Sign up for a new account</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FULL NAME */}
            <div>
              <label className="auth-input-label text-cyan-300">Full Name</label>
              <div className="relative">
                <UserIcon className="auth-input-icon text-cyan-400" />
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setformData({ ...formData, fullname: e.target.value })}
                  className="input bg-[#0b0d16] text-white border-cyan-500/30 focus:border-cyan-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* EMAIL INPUT */}
            <div>
              <label className="auth-input-label text-cyan-300">Email</label>
              <div className="relative">
                <MailIcon className="auth-input-icon text-cyan-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setformData({ ...formData, email: e.target.value })}
                  className="input bg-[#0b0d16] text-white border-cyan-500/30 focus:border-cyan-400"
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="auth-input-label text-cyan-300">Password</label>
              <div className="relative">
                <LockIcon className="auth-input-icon text-cyan-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setformData({ ...formData, password: e.target.value })}
                  className="input bg-[#0b0d16] text-white border-cyan-500/30 focus:border-cyan-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              className="auth-btn bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-pink-500 hover:to-cyan-400 text-black font-semibold"
              type="submit"
              disabled={isSigningup}
            >
              {isSigningup ? (
                <LoaderIcon className="w-full h-5 animate-spin text-center" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-cyan-300">
            <Link to="/login" className="auth-link hover:text-cyan-400 transition-colors">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>

      {/* FORM ILLUSTRATION - RIGHT SIDE */}
      <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-[#0b0d16]/20 via-[#05060b]/0 to-transparent">
        <div className="relative">
          <img
            src="/signup.png"
            alt="People using mobile devices"
            className="w-full h-auto object-contain"
          />
          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-pink-400">Start Your Journey Today</h3>

            <div className="mt-4 flex justify-center gap-4">
              <span className="auth-badge bg-cyan-400/20 text-cyan-300">Free</span>
              <span className="auth-badge bg-pink-400/20 text-pink-300">Easy Setup</span>
              <span className="auth-badge bg-purple-400/20 text-purple-300">Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default SignupPage
