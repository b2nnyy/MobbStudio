import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { listHolds } from '../lib/bookingApi'

export function Admin() {
  const navigate = useNavigate()
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onLogin() {
    const t = token.trim()
    if (!t) return
    setLoading(true)
    setError(null)
    try {
      // Validate token by attempting to list holds.
      await listHolds(t)
      navigate('/admin/approvals', { state: { token: t } })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-xl font-semibold">Admin</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Enter your admin code to manage holds.
        </p>

        <div className="mt-6">
          <label className="text-sm" htmlFor="adminCode">
            Admin code
          </label>
          <input
            id="adminCode"
            type="password"
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-zinc-950/60 dark:text-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoComplete="off"
            inputMode="numeric"
          />
        </div>

        <Button
          type="button"
          onClick={() => void onLogin()}
          disabled={token.trim().length === 0}
          loading={loading}
          loadingLabel="Checking access"
          className="mt-4 w-full"
        >
          Log in
        </Button>

        {error ? (
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300" role="status">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  )
}

