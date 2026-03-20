import { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = (event) => {
    event.preventDefault()

    const payload = {
      username,
      email,
      password,
    }

    console.log('Register payload:', payload)
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-[#0f0f0f] via-[#1c1917] to-[#7c2d12] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-orange-400/30 bg-black/40 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(251,146,60,0.25)]">
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-500">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-zinc-300">
            Register with your username, email, and password.
          </p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-200">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-zinc-100 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(251,146,60,0.25)]"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">
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
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                required
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-zinc-100 outline-none transition focus:border-orange-400 focus:shadow-[0_0_0_3px_rgba(251,146,60,0.25)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-linear-to-r from-orange-400 to-yellow-500 px-4 py-3 font-semibold text-black transition hover:from-orange-300 hover:to-yellow-400 focus:outline-none focus:shadow-[0_0_0_3px_rgba(251,146,60,0.35)]"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-300">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-orange-400 transition hover:text-orange-300">
              Login
            </Link>
          </p>

        </div>
      </div>
    </section>
  )
}

export default Register