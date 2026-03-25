import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
// Using Lucide-react for the icons (LogIn, Eye, Sparkles)
import { LogIn, Eye, Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    const payload = { email, password };
    await handleLogin(payload);
    navigate("/");
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* The Main Card Container */}
      <div className="w-full max-w-[440px] bg-[#1a1c1c] rounded-[32px] p-10 flex flex-col items-center shadow-2xl border border-white/5">
        
        {/* Top Icon Section */}
        <div className="mb-8 p-3 bg-[#202222] border border-white/10 rounded-2xl text-[#21b3cc]">
          <LogIn size={36} strokeWidth={1.5} />
        </div>

        {/* Header Text */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-[#8e9191] text-[15px] font-medium">
            Continue your discovery journey with speed.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={submitForm} className="w-full space-y-6">
          
          {/* Email Field with the requested space */}
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="email" 
              className="text-[13px] font-semibold text-[#8e9191] ml-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-[#202222] rounded-2xl px-5 py-4 text-white placeholder-[#4d4f4f] outline-none border border-transparent focus:border-[#21b3cc]/30 transition-all"
            />
          </div>

          {/* Password Field with the requested space */}
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="password" 
              className="text-[13px] font-semibold text-[#8e9191] ml-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-[#202222] rounded-2xl px-5 py-4 text-white placeholder-[#4d4f4f] outline-none border border-transparent focus:border-[#21b3cc]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4d4f4f] hover:text-zinc-300"
              >
                <Eye size={20} />
              </button>
            </div>
            <div className="text-right">
              <button type="button" className="text-[13px] font-bold text-[#21b3cc] hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5da3b0] py-4 font-bold text-[#14292d] transition-colors hover:bg-[#6cb4c2] disabled:opacity-50 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
            <Sparkles size={18} className="transition-transform group-hover:scale-110" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-10 text-center text-[14px] font-medium text-[#8e9191]">
          New to Perplexity?{" "}
          <Link to="/register" className="font-bold text-[#21b3cc] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;