import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    }

    await handleLogin(payload)
    navigate("/")
  }

  if(!loading && user){
    return <Navigate to="/" replace />
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1c1917] to-[#7c2d12] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-orange-400/30 bg-black/40 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(251,146,60,0.25)]">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-zinc-300">
            Sign in with your email and password.
          </p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-zinc-100 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(251,146,60,0.25)]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-zinc-100 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(251,146,60,0.25)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-orange-400 to-yellow-500 px-4 py-3 font-semibold text-black transition hover:from-orange-300 hover:to-yellow-400 focus:outline-none focus:shadow-[0_0_0_3px_rgba(251,146,60,0.35)]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-orange-400 transition hover:text-orange-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
