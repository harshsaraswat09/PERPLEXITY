import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserPlus, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    const payload = { username, email, password, confirmPassword };
    console.log("Register payload:", payload);
    // Add your registration logic here
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      {/* The Main Card Container */}
      <div className="w-full max-w-[480px] bg-[#1a1c1c] rounded-[32px] p-10 flex flex-col items-center shadow-2xl border border-white/5">
        
        {/* Top Icon Section */}
        <div className="mb-6 p-3 bg-[#202222] border border-white/10 rounded-2xl text-[#21b3cc]">
          <UserPlus size={26} strokeWidth={1.5} />
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h1 className="text-[32px] font-extrabold text-white tracking-tight leading-tight">
            Create your account
          </h1>
          <p className="mt-2 text-[#8e9191] text-[15px] font-medium px-4">
            Join the next generation of knowledge discovery.
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={submitForm} className="w-full space-y-5">
          
          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#8e9191] ml-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a cool username"
              required
              className="w-full bg-[#202222] rounded-2xl px-5 py-4 text-white placeholder-[#4d4f4f] outline-none border border-transparent focus:border-[#21b3cc]/30 transition-all"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#8e9191] ml-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-[#202222] rounded-2xl px-5 py-4 text-white placeholder-[#4d4f4f] outline-none border border-transparent focus:border-[#21b3cc]/30 transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#8e9191] ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                required
                className="w-full bg-[#202222] rounded-2xl px-5 py-4 text-white placeholder-[#4d4f4f] outline-none border border-transparent focus:border-[#21b3cc]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4d4f4f] hover:text-zinc-300 transition-colors"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#8e9191] ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full bg-[#202222] rounded-2xl px-5 py-4 text-white placeholder-[#4d4f4f] outline-none border border-transparent focus:border-[#21b3cc]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#4d4f4f] hover:text-zinc-300 transition-colors"
              >
                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-[#2dbcd4] hover:bg-[#38cade] text-[#0a2327] font-bold py-4 rounded-2xl transition-colors mt-4 text-[16px]"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-8 text-center text-[14px] font-medium text-[#8e9191]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#21b3cc] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;