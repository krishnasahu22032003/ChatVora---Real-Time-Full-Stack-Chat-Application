import { Navigate, Route, Routes } from "react-router"
import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import PageLoading from "./components/pageLoading"
import { Toaster } from "react-hot-toast"
function App() {

  const{checkAuth,isCheckingAuth,authUser} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log(authUser)


  if(isCheckingAuth) return <PageLoading/>
  return (
    <>
  <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden 
  bg-[radial-gradient(ellipse_at_top_left,#0b0d16_0%,#05060b_40%,#03040a_100%)]">

  {/* ✨ 1. Ambient color layers */}
  <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]
      bg-[radial-gradient(circle_at_30%_40%,rgba(99,205,255,0.09)_0%,transparent_70%)]
      blur-[120px]" />

  <div className="absolute bottom-[-20%] right-[-15%] w-[700px] h-[700px]
      bg-[radial-gradient(circle_at_70%_70%,rgba(210,140,255,0.1)_0%,transparent_70%)]
      blur-[150px]" />

  {/* 🌈 2. Soft moving prism sweep */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]
        bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,0,128,0.05)_0%,rgba(0,255,255,0.05)_30%,rgba(0,128,255,0.05)_60%,rgba(255,255,255,0.02)_100%)]
        animate-[rotate_30s_linear_infinite]" />
  </div>

  {/* 🩵 3. Light sheen overlay */}
  <div className="absolute inset-0 
      bg-[linear-gradient(115deg,rgba(255,255,255,0.03)_0%,transparent_50%,rgba(255,255,255,0.02)_100%)]
      mix-blend-overlay pointer-events-none" />

  {/* 🪶 4. Subtle grain for realism */}
  <div className="absolute inset-0 
      bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGBgAAAABAABJzQnCgAAAABJRU5ErkJggg==')]
      opacity-[0.025] mix-blend-overlay pointer-events-none" />

  <Routes>
    <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"}/>} />
    <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
    <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"}/>} />
  </Routes>
</div>

<Toaster/>
    </>
  )
}

export default App
