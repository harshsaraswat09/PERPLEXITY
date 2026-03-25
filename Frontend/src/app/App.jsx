import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { useAuth } from "../features/auth/hook/useAuth"
import { useEffect, useState } from "react"
import Loader from "../features/chat/components/Loader"

function App() {
  const auth = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.handleGetMe()
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-screen w-full bg-[#070707]">
      {/* Loader overlay jo loading khatam hone par fade-out hoga */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Loader />
      </div>

      {/* Main Content */}
      <div className={`h-full w-full transition-all duration-1000 ${loading ? 'scale-95 blur-sm' : 'scale-100 blur-0'}`}>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App