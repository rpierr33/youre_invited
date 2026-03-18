import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { login } from '../lib/api'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { saveToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await login(username, password)
      saveToken(res.token)
      navigate('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-12">
          <h1 className="font-cormorant text-3xl font-light text-charcoal">YOU'RE INVITED</h1>
          <p className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-warm-gray mt-3">Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Password"
            required
          />

          {error && <p className="text-red-500 font-body text-[0.8125rem]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-charcoal text-white font-body text-[0.75rem] tracking-[0.15em] uppercase hover:bg-charcoal/80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
