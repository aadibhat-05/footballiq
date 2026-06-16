import { useState } from 'react'
import { useNavigate,
    useLocation,
 } from 'react-router-dom'
import { signIn,
    signInWithGoogle,
 } from '../services/authService'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()

  const location = useLocation()

  const from =
    location.state?.from?.pathname || '/dashboard'

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const { user } = useAuth()

  const [message, setMessage] =
    useState('')

  async function handleLogin(
    e: React.FormEvent
  ){
    e.preventDefault()

    const { error } =
      await signIn(
        email,
        password
      )

    if (error) {
      setMessage(error.message)
      return
    }

    navigate(from, {
        replace: true,
    })
  }
  if (user) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="p-10 text-white">
      <h1 className="mb-6 text-4xl font-bold">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="max-w-md space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-xl border border-gray-800 bg-gray-950 p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded-xl border border-gray-800 bg-gray-950 p-3"
        />

        <button
          type="button"
          onClick={async () => {
            await signInWithGoogle()
          }}
          className="w-full rounded-xl border border-gray-700 bg-gray-900 p-3"
        >
            Continue with Google
        </button>

        <button
          type="submit"
          className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-black"
        >
          Login
        </button>
      </form>

      {message && (
        <p className="mt-4">
          {message}
        </p>
      )}
    </div>
  )
}

export default LoginPage