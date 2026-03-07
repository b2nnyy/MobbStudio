import { useEffect, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'
import { cancelHold, confirmHold, listHolds, type HoldRecord } from '../lib/bookingApi'

function fmtHoldSummary(h: HoldRecord) {
  const hours = Math.round((h.durationMinutes || 0) / 60)
  return `${h.date} · ${h.room} · ${h.startHour}:00 · ${hours}h`
}

export function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('adminToken') || '')
  const [loggedIn, setLoggedIn] = useState(() => Boolean(sessionStorage.getItem('adminToken')))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [holds, setHolds] = useState<HoldRecord[]>([])
  const [actionBusy, setActionBusy] = useState<string | null>(null)

  const pendingHolds = useMemo(() => {
    // backend should already return only pending/non-expired, but we defensively filter
    return holds.filter((h) => (h.status || '').toLowerCase() === 'pending')
  }, [holds])

  async function refresh() {
    if (!token.trim()) return
    setLoading(true)
    setError(null)
    try {
      const data = await listHolds(token.trim())
      setHolds(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load holds')
      setHolds([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loggedIn) void refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn])

  async function onApprove(holdId: string) {
    setActionBusy(holdId)
    setError(null)
    try {
      await confirmHold(holdId, token.trim())
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
      await cancelHold(holdId, token.trim())
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to deny')
    } finally {
      setActionBusy(null)
    }
  }

  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Admin"
        title="Booking approvals"
        description="Approve holds after deposit is received. Deny to release the time slot."
      />

      <div className="mt-8 grid gap-4">
        <Card>
          <CardBody>
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Admin login</h2>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Enter the admin code to view pending holds.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="w-full sm:max-w-sm">
                <label className="text-sm text-zinc-700 dark:text-zinc-200" htmlFor="adminToken">
                  Admin code
                </label>
                <input
                  id="adminToken"
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-zinc-950/60 dark:text-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="600010"
                />
              </div>
              {loggedIn ? (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => void refresh()}
                    disabled={loading}
                  >
                    {loading ? 'Refreshing…' : 'Refresh'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      sessionStorage.removeItem('adminToken')
                      setLoggedIn(false)
                      setToken('')
                      setHolds([])
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    const t = token.trim()
                    if (!t) return
                    sessionStorage.setItem('adminToken', t)
                    setToken(t)
                    setLoggedIn(true)
                  }}
                >
                  Log in
                </Button>
              )}
            </div>

            {error ? (
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300" role="status">
                {error}
              </p>
            ) : null}
          </CardBody>
        </Card>

        {loggedIn ? (
          <Card>
            <CardBody>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Pending holds</h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Approve after deposit is received. Deny releases the slot immediately.
                  </p>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {pendingHolds.length} pending
                </p>
              </div>

              {pendingHolds.length === 0 ? (
                <p className="mt-6 text-sm text-zinc-700 dark:text-zinc-300">No pending holds.</p>
              ) : (
                <div className="mt-6 grid gap-3">
                  {pendingHolds.map((h) => (
                    <div
                      key={h.holdId}
                      className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-950 dark:text-white">
                            {fmtHoldSummary(h)}
                          </p>
                          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                            Hold code: <span className="font-mono">{h.holdId}</span>
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
                          <Button
                            type="button"
                            onClick={() => void onApprove(h.holdId)}
                            disabled={actionBusy != null}
                          >
                            {actionBusy === h.holdId ? 'Working…' : 'Approve'}
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => void onDeny(h.holdId)}
                            disabled={actionBusy != null}
                          >
                            {actionBusy === h.holdId ? 'Working…' : 'Deny'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

