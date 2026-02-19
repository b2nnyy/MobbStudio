import { useEffect, useMemo, useState } from 'react'
import {
  cashAppUrl,
  depositPercent,
  instagramHandle,
  instagramUrl,
  minAdvanceHours,
  minHours,
  rates,
} from '../lib/constants'
import { bookSession, fetchBusyHours } from '../lib/bookingApi'
import { ButtonExternalLink, ButtonLink, Button } from '../components/Button'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function isoLocalDate(d: Date) {
  const y = d.getFullYear()
  const m = pad2(d.getMonth() + 1)
  const day = pad2(d.getDate())
  return `${y}-${m}-${day}`
}

function monthLabel(d: Date) {
  return d.toLocaleString(undefined, { month: 'long', year: 'numeric' })
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addMonths(d: Date, delta: number) {
  const next = new Date(d)
  next.setMonth(next.getMonth() + delta)
  return next
}

function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

export function Book() {
  const today = useMemo(() => new Date(), [])
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()))
  const [date, setDate] = useState(() => isoLocalDate(new Date()))

  const [busyHours, setBusyHours] = useState<number[] | null>(null)
  const busySet = useMemo(() => new Set(busyHours ?? []), [busyHours])
  const [loadingBusy, setLoadingBusy] = useState(false)
  const [busyError, setBusyError] = useState<string | null>(null)

  const [startHour, setStartHour] = useState<number | null>(null)
  const [hours, setHours] = useState<number>(minHours)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [ig, setIg] = useState('')
  const [notes, setNotes] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitMsg, setSubmitMsg] = useState<string | null>(null)
  const [bookingSucceeded, setBookingSucceeded] = useState(false)
  const [bookedHours, setBookedHours] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoadingBusy(true)
    setBusyError(null)
    setBusyHours(null)
    setStartHour(null)
    ;(async () => {
      try {
        const data = await fetchBusyHours(date)
        if (!cancelled) setBusyHours(data)
      } catch (e) {
        if (!cancelled) {
          setBusyError(e instanceof Error ? e.message : 'Failed to load availability')
          setBusyHours([])
        }
      } finally {
        if (!cancelled) setLoadingBusy(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [date])

  const minStart = useMemo(() => {
    const now = new Date()
    return new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000)
  }, [])

  const hoursOptions = useMemo(() => {
    const opts: number[] = []
    for (let h = minHours; h <= 12; h++) opts.push(h)
    return opts
  }, [])

  function hourLabel(h: number) {
    const d = new Date()
    d.setHours(h, 0, 0, 0)
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }

  function rangeLabel(start: number, lenHours: number) {
    return `${hourLabel(start)} - ${hourLabel(start + lenHours)}`
  }

  function isHourBlockedByAdvanceRule(targetDate: string, h: number) {
    // Compare using local Date (assumes Apps Script timezone matches intended booking timezone)
    const [y, m, day] = targetDate.split('-').map(Number)
    const slot = new Date(y, m - 1, day, h, 0, 0, 0)
    return slot < minStart
  }

  function isRangeFree(s: number, lenHours: number) {
    for (let h = s; h < s + lenHours; h++) {
      if (h < 0 || h > 23) return false
      if (busySet.has(h)) return false
      if (isHourBlockedByAdvanceRule(date, h)) return false
    }
    return true
  }

  const canSubmit =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    ig.trim().length > 0 &&
    startHour != null &&
    hours >= minHours &&
    isRangeFree(startHour ?? 0, hours) &&
    !submitting

  const successfulSessionTotal = bookedHours == null ? 0 : bookedHours * rates.withEngineerHourly
  const successfulDepositAmount =
    successfulSessionTotal * (depositPercent / 100)
  const successfulDepositDisplay = successfulDepositAmount.toFixed(2)
  const successfulSessionTotalDisplay = successfulSessionTotal.toFixed(2)
  const cashAppDepositUrl = useMemo(() => {
    const url = new URL(cashAppUrl)
    url.searchParams.set('amount', successfulDepositDisplay)
    return url.toString()
  }, [successfulDepositDisplay])

  async function onSubmit() {
    if (!canSubmit || startHour == null) return
    setSubmitting(true)
    setSubmitMsg(null)
    setBookingSucceeded(false)
    setBookedHours(null)
    try {
      await bookSession({
        name: name.trim(),
        phone: phone.trim(),
        instagram: ig.trim(),
        date,
        startHour,
        durationMinutes: hours * 60,
        notes: notes.trim() || undefined,
      })
      setSubmitMsg('Request received — check your email/DMs for confirmation (if applicable).')
      setBookingSucceeded(true)
      setBookedHours(hours)
      // Refresh availability after booking
      const data = await fetchBusyHours(date)
      setBusyHours(data)
      setStartHour(null)
    } catch (e) {
      setSubmitMsg(e instanceof Error ? e.message : 'Booking failed')
      setBookingSucceeded(false)
      setBookedHours(null)
    } finally {
      setSubmitting(false)
    }
  }

  const monthStart = startOfMonth(viewMonth)
  const firstDow = monthStart.getDay() // 0 Sun
  const dim = daysInMonth(viewMonth)

  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Booking"
        title="Book a session"
        description={`Pick a date and time. Minimum booking is ${minHours} hours. Please book at least ${minAdvanceHours} hours in advance.`}
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonExternalLink href={instagramUrl} variant="secondary">
          DM {instagramHandle}
        </ButtonExternalLink>
        <ButtonLink to="/rates" variant="secondary">
          View rates
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardBody>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{monthLabel(viewMonth)}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setViewMonth((m) => startOfMonth(addMonths(m, -1)))}
                  aria-label="Previous month"
                >
                  Prev
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setViewMonth((m) => startOfMonth(addMonths(m, 1)))}
                  aria-label="Next month"
                >
                  Next
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-zinc-400">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <div key={d} className="text-center">
                  {d}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: firstDow }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}
              {Array.from({ length: dim }).map((_, i) => {
                const day = i + 1
                const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
                const dIso = isoLocalDate(d)
                const isPast = dIso < isoLocalDate(today)
                const isSelected = dIso === date
                return (
                  <button
                    key={dIso}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                      setDate(dIso)
                      setViewMonth(startOfMonth(d))
                    }}
                    className={[
                      'aspect-square rounded-lg border px-2 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                      isPast
                        ? 'cursor-not-allowed border-white/10 bg-white/5 text-zinc-600'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10',
                      isSelected ? 'ring-2 ring-zinc-200 ring-offset-2 ring-offset-zinc-950' : '',
                    ].join(' ')}
                    aria-pressed={isSelected}
                    aria-label={d.toDateString()}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            <p className="mt-4 text-xs text-zinc-400">
              Times shown in your local timezone. Please book at least {minAdvanceHours} hours ahead.
            </p>
          </CardBody>
        </Card>

        <Card className="lg:col-span-7">
          <CardBody>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Time slots</p>
                <p className="mt-1 text-xs text-zinc-400">{date}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Pick a start time and we book the full {hours}-hour block.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs text-zinc-400" htmlFor="bkHours">
                  Hours
                </label>
                <select
                  id="bkHours"
                  className="rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  value={hours}
                  onChange={(e) => {
                    const next = Number(e.target.value)
                    setHours(next)
                    if (startHour != null && !isRangeFree(startHour, next)) setStartHour(null)
                  }}
                >
                  {hoursOptions.map((h) => (
                    <option key={h} value={h}>
                      {h} hours
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {busyError ? (
              <p className="mt-4 text-sm text-zinc-300">
                Couldn’t load availability: {busyError}
              </p>
            ) : null}

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 24 }).map((_, h) => {
                const blocked =
                  loadingBusy ||
                  busyHours == null ||
                  !isRangeFree(h, hours)
                const selected = startHour === h
                return (
                  <button
                    key={h}
                    type="button"
                    disabled={blocked}
                    onClick={() => setStartHour(h)}
                    className={[
                      'rounded-xl border px-3 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                      blocked
                        ? 'cursor-not-allowed border-white/10 bg-white/5 text-zinc-600'
                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10',
                      selected ? 'border-white/30 bg-white/10' : '',
                    ].join(' ')}
                    aria-pressed={selected}
                    aria-label={rangeLabel(h, hours)}
                  >
                    <div className="font-semibold">{rangeLabel(h, hours)}</div>
                    <div className="mt-1 text-xs text-zinc-400">
                      {blocked ? 'Unavailable' : `${hours}-hour slot`}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-sm text-zinc-200" htmlFor="bkName">
                  Name
                </label>
                <input
                  id="bkName"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-200" htmlFor="bkPhone">
                  Phone
                </label>
                <input
                  id="bkPhone"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-200" htmlFor="bkIg">
                  Instagram
                </label>
                <input
                  id="bkIg"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  value={ig}
                  onChange={(e) => setIg(e.target.value)}
                  placeholder="@handle"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-sm text-zinc-200" htmlFor="bkNotes">
                Notes (optional)
              </label>
              <textarea
                id="bkNotes"
                className="mt-2 min-h-24 w-full resize-y rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What are you working on?"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit}
                aria-label="Request booking"
              >
                {submitting ? 'Sending…' : 'Request booking'}
              </Button>
              <p className="text-sm text-zinc-400">
                {startHour == null
                  ? 'Select an available start time.'
                  : `Selected: ${rangeLabel(startHour, hours)} (${hours} hour${hours === 1 ? '' : 's'}).`}
              </p>
            </div>

            {submitMsg ? (
              <p className="mt-3 text-sm text-zinc-300" role="status" aria-live="polite">
                {submitMsg}
              </p>
            ) : null}

            {bookingSucceeded ? (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-zinc-200">
                  Deposit is {depositPercent}% of your session total (with engineer rate).
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  Session total: ${successfulSessionTotalDisplay} · Deposit due: ${successfulDepositDisplay}
                </p>
                <div className="mt-3">
                  <ButtonExternalLink href={cashAppDepositUrl}>
                    Pay ${successfulDepositDisplay} deposit
                  </ButtonExternalLink>
                </div>
              </div>
            ) : null}
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Booking notes
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Minimum booking: {minHours} hours</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Minimum advance notice: {minAdvanceHours} hours</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  If you want a longer block, book consecutive slots or DM us.
                </span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Prefer Instagram?
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              If you have special requests or need help finding a time, DM us and
              we’ll sort it out.
            </p>
            <div className="mt-5">
              <ButtonExternalLink href={instagramUrl}>
                DM {instagramHandle}
              </ButtonExternalLink>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

