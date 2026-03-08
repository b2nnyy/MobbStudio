import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoadingSpark } from '../components/Button'
import { cancelHold, confirmHold, deleteHold, listHolds, type HoldRecord } from '../lib/bookingApi'

function fmtHoldSummary(h: HoldRecord) {
  const hours = Math.round((h.durationMinutes || 0) / 60)
  return `Room ${h.room} · ${h.date} · ${h.startHour}:00 · ${hours}h`
}

function statusLabel(status: string) {
  const s = status.toLowerCase()
  if (s === 'confirmed') return 'Accepted'
  if (s === 'cancelled') return 'Denied'
  if (s === 'pending') return 'Pending'
  return status || 'Unknown'
}

function historyCardClass(status: string) {
  const s = status.toLowerCase()
  if (s === 'confirmed') {
    return 'border-emerald-300 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.28),0_0_28px_rgba(16,185,129,0.16)] dark:border-emerald-400/50 dark:bg-emerald-500/10'
  }
  if (s === 'cancelled') {
    return 'border-rose-300 bg-rose-500/10 shadow-[0_0_0_1px_rgba(244,63,94,0.28),0_0_28px_rgba(244,63,94,0.16)] dark:border-rose-400/50 dark:bg-rose-500/10'
  }
  return 'border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none'
}

function statusPillClass(status: string) {
  const s = status.toLowerCase()
  if (s === 'confirmed') {
    return 'border border-emerald-300/70 bg-emerald-500/15 text-emerald-700 shadow-[0_0_16px_rgba(16,185,129,0.18)] dark:border-emerald-400/40 dark:text-emerald-200'
  }
  if (s === 'cancelled') {
    return 'border border-rose-300/70 bg-rose-500/15 text-rose-700 shadow-[0_0_16px_rgba(244,63,94,0.18)] dark:border-rose-400/40 dark:text-rose-200'
  }
  return 'border border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200'
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
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending')

  const pendingHolds = useMemo(
    () => holds.filter((h) => (h.status || '').toLowerCase() === 'pending'),
    [holds],
  )
  const historyHolds = useMemo(
    () =>
      holds
        .filter((h) => {
          const s = (h.status || '').toLowerCase()
          return s === 'confirmed' || s === 'cancelled'
        })
        .sort((a, b) => {
          const aKey = `${a.date}-${String(a.startHour).padStart(2, '0')}`
          const bKey = `${b.date}-${String(b.startHour).padStart(2, '0')}`
          return aKey < bKey ? 1 : aKey > bKey ? -1 : 0
        }),
    [holds],
  )

  const tabContent =
    activeTab === 'pending' ? (
      pendingHolds.length === 0 ? (
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
                    {actionBusy === h.holdId ? <LoadingSpark label="Accepting" /> : 'Accept'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDeny(h.holdId)}
                    disabled={actionBusy != null}
                    className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    {actionBusy === h.holdId ? <LoadingSpark label="Denying" /> : 'Deny'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    ) : historyHolds.length === 0 ? (
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-none">
        No history yet. If you’ve already accepted or denied sessions, update the Apps Script `handleList_()` so it returns
        confirmed and cancelled holds too.
      </div>
    ) : (
      <div className="mt-4 grid gap-3">
        {historyHolds.map((h) => (
          <div key={h.holdId} className={`rounded-xl border p-4 ${historyCardClass(h.status)}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{fmtHoldSummary(h)}</p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${statusPillClass(h.status)}`}
                  >
                    {statusLabel(h.status)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Hold: <span className="font-mono">{h.holdId}</span>
                </p>
                <div className="mt-3 grid gap-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {h.name ? <p>Name: {h.name}</p> : null}
                  {h.phone ? <p>Phone: {h.phone}</p> : null}
                  {h.instagram ? <p>IG: {h.instagram}</p> : null}
                  {h.email ? <p>Email: {h.email}</p> : null}
                </div>
              </div>
              <div className="flex shrink-0 items-start">
                <button
                  type="button"
                  onClick={() => void onDeleteHistory(h.holdId)}
                  disabled={actionBusy != null}
                  className="rounded-lg border border-rose-300/70 bg-white/70 px-4 py-2 text-sm font-medium text-rose-700 shadow-[0_0_18px_rgba(244,63,94,0.14)] hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-400/40 dark:bg-white/5 dark:text-rose-200 dark:hover:bg-rose-500/10"
                >
                  {actionBusy === h.holdId ? <LoadingSpark label="Deleting" /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
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

  async function onDeleteHistory(holdId: string) {
    const ok = window.confirm('Delete this history record permanently? This cannot be undone.')
    if (!ok) return

    setActionBusy(holdId)
    setError(null)
    try {
      await deleteHold(holdId, token)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete record')
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
              {loading ? <LoadingSpark label="Refreshing" /> : 'Refresh'}
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                onClick={() => setActiveTab('pending')}
                className={[
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  activeTab === 'pending'
                    ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
                ].join(' ')}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={[
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  activeTab === 'history'
                    ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-900 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
                ].join(' ')}
              >
                History
              </button>
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {activeTab === 'pending' ? `${pendingHolds.length} pending` : `${historyHolds.length} past sessions`}
            </div>
          </div>
        </div>

        {tabContent}
      </div>
    </div>
  )
}

