import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cancelHold, confirmHold, listHolds, type HoldRecord } from '../lib/bookingApi'

function fmtHoldSummary(h: HoldRecord) {
  const hours = Math.round((h.durationMinutes || 0) / 60)
  return `Room ${h.room} · ${h.date} · ${h.startHour}:00 · ${hours}h`
}

type LocationState = { token?: string }

export function AdminApprovals() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = (location.state as LocationState | null)?.token?.trim() || ''

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [holds, setHolds] = useState<HoldRecord[]>([])
  const [actionBusy, setActionBusy] = useState<string | null>(null)

  const pendingHolds = useMemo(
    () => holds.filter((h) => (h.status || '').toLowerCase() === 'pending'),
    [holds],
  )

  async function refresh() {
    if (!token) return
    setLoading(true)
    setError(null)
    try {
      const data = await listHolds(token)
      setHolds(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load holds')
      setHolds([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token) return
    void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  async function onApprove(holdId: string) {
    setActionBusy(holdId)
    setError(null)
    try {
      await confirmHold(holdId, token)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to approve')
    } finally {
      setActionBusy(null)
    }
  }

  async function onDeny(holdId: string) {
    setActionBusy(holdId)
    setError(null)
    try {
      await cancelHold(holdId, token)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to deny')
    } finally {
      setActionBusy(null)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-xl font-semibold">Admin</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            You’re not logged in. Please return to the login page.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="mt-4 w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Go to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Approvals</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Accept creates the calendar event and emails the client. Deny releases the slot and emails the client.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <Link
              to="/admin"
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              Log out
            </Link>
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300" role="status">
            {error}
          </p>
        ) : null}

        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Pending</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{pendingHolds.length}</p>
          </div>
        </div>

        {pendingHolds.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-700 dark:text-zinc-300">No pending holds.</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {pendingHolds.map((h) => (
              <div
                key={h.holdId}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{fmtHoldSummary(h)}</p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      Hold: <span className="font-mono">{h.holdId}</span>
                      {h.expiresAt ? (
                        <span>
                          {' '}
                          · Expires: <span className="font-mono">{h.expiresAt}</span>
                        </span>
                      ) : null}
                    </p>
                    <div className="mt-3 grid gap-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {h.name ? <p>Name: {h.name}</p> : null}
                      {h.phone ? <p>Phone: {h.phone}</p> : null}
                      {h.instagram ? <p>IG: {h.instagram}</p> : null}
                      {h.email ? <p>Email: {h.email}</p> : null}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => void onApprove(h.holdId)}
                      disabled={actionBusy != null}
                      className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      {actionBusy === h.holdId ? 'Working…' : 'Accept'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void onDeny(h.holdId)}
                      disabled={actionBusy != null}
                      className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      {actionBusy === h.holdId ? 'Working…' : 'Deny'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

