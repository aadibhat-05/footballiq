import { useState } from 'react'
import { signUp } from '../services/authService'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function SignupPage() {
  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const { user } = useAuth()

  const [message, setMessage] =
    useState('')

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault()

    const { data, error } =
      await signUp(
        email,
        password
      )
    console.log(data)
    console.log(error)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage(
      'Account created successfully'
    )
  }
  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }
  
  return (
    <div className="p-10 text-white">
      <h1 className="mb-6 text-4xl font-bold">
        Sign Up
      </h1>

      <form
        onSubmit={handleSignup}
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
          type="submit"
          className="rounded-xl bg-green-500 px-5 py-3 font-semibold text-black"
        >
          Create Account
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

export default SignupPage