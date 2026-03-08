import { bookingApiUrl, minHours, type StudioRoomId } from './constants'
import { jsonp } from './jsonp'

export type BusyResponse = {
  ok: boolean
  error?: string
  date?: string
  busyHours?: number[]
}

export type BookResponse = {
  ok: boolean
  error?: string
  eventId?: string
  start?: string
  end?: string
}

export type HoldResponse = {
  ok: boolean
  error?: string
  holdId?: string
  expiresAt?: string
}

export type HoldRecord = {
  holdId: string
  status: string
  room: StudioRoomId
  date: string // YYYY-MM-DD
  startHour: number
  durationMinutes: number
  expiresAt?: string
  name?: string
  phone?: string
  instagram?: string
  email?: string
  notes?: string
}

async function fetchJsonWithTimeout<T>(url: string, timeoutMs = 12000): Promise<T> {
  const controller = new AbortController()
  const t = window.setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      signal: controller.signal,
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    // Apps Script often replies as text/javascript even when the body is JSON.
    const text = await res.text()
    try {
      return JSON.parse(text) as T
    } catch {
      throw new Error(`Invalid JSON response`)
    }
  } finally {
    window.clearTimeout(t)
  }
}

async function requestApi<T>(url: string): Promise<T> {
  try {
    return await fetchJsonWithTimeout<T>(url)
  } catch (e) {
    // Fallback for environments where cross-origin fetch is blocked but <script> loads are allowed.
    return await jsonp<T>(url)
  }
}

function normalizeApiErrorMessage(msg: string) {
  // Make misconfiguration actionable (common during setup).
  if (msg.includes('Calendar not found') || msg.includes('CALENDAR_ID')) {
    return 'Booking system misconfigured (Calendar not found). Fix Apps Script config: set CALENDAR_ID in Script Properties and redeploy.'
  }
  if (msg.includes('Unknown mode')) {
    return 'Booking system misconfigured (Unknown mode). Your Apps Script must implement mode=busy/mode=hold/etc. (see README.md) and be redeployed.'
  }
  return msg
}

export async function fetchBusyHours(dateIso: string, roomId: StudioRoomId): Promise<number[]> {
  const url = `${bookingApiUrl}?mode=busy&date=${encodeURIComponent(dateIso)}&room=${encodeURIComponent(
    roomId,
  )}`
  let data: BusyResponse
  try {
    data = await requestApi<BusyResponse>(url)
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Failed to load availability'
    throw new Error(normalizeApiErrorMessage(msg))
  }
  if (!data.ok) throw new Error(data.error || 'Failed to load availability')
  return Array.isArray(data.busyHours) ? data.busyHours : []
}

type ListHoldsResponse = {
  ok: boolean
  error?: string
  holds?: HoldRecord[]
}

type SimpleOkResponse = {
  ok: boolean
  error?: string
}

export async function createHold(input: {
  name: string
  phone: string
  instagram: string
  email: string
  date: string // YYYY-MM-DD
  roomId: StudioRoomId
  startHour: number // 0-23
  durationMinutes: number
  notes?: string
}): Promise<{ holdId: string; expiresAt?: string }> {
  const params = new URLSearchParams()
  params.set('mode', 'hold')
  params.set('name', input.name)
  params.set('phone', input.phone)
  params.set('instagram', input.instagram)
  params.set('email', input.email)
  params.set('date', input.date)
  params.set('room', input.roomId)
  params.set('startHour', String(input.startHour))
  params.set('durationMinutes', String(input.durationMinutes))
  if (input.notes) params.set('notes', input.notes)
  params.set('minHours', String(minHours))

  const url = `${bookingApiUrl}?${params.toString()}`
  const data = await requestApi<HoldResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to create hold')
  if (!data.holdId) throw new Error('Hold created but no holdId returned')
  return { holdId: data.holdId, expiresAt: data.expiresAt }
}

export async function listHolds(adminToken: string): Promise<HoldRecord[]> {
  const url = `${bookingApiUrl}?mode=list&token=${encodeURIComponent(adminToken)}`
  const data = await requestApi<ListHoldsResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to load holds')
  return Array.isArray(data.holds) ? data.holds : []
}

export async function confirmHold(holdId: string, adminToken: string): Promise<void> {
  const url = `${bookingApiUrl}?mode=confirm&holdId=${encodeURIComponent(
    holdId,
  )}&token=${encodeURIComponent(adminToken)}`
  const data = await requestApi<SimpleOkResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to confirm hold')
}

export async function cancelHold(holdId: string, adminToken: string): Promise<void> {
  const url = `${bookingApiUrl}?mode=cancel&holdId=${encodeURIComponent(
    holdId,
  )}&token=${encodeURIComponent(adminToken)}`
  const data = await requestApi<SimpleOkResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to cancel hold')
}

export async function bookSession(input: {
  name: string
  phone: string
  instagram: string
  date: string // YYYY-MM-DD
  roomId: StudioRoomId
  startHour: number // 0-23
  durationMinutes: number
  notes?: string
}): Promise<BookResponse> {
  const params = new URLSearchParams()
  params.set('mode', 'book')
  params.set('name', input.name)
  params.set('phone', input.phone)
  params.set('instagram', input.instagram)
  params.set('date', input.date)
  params.set('room', input.roomId)
  params.set('startHour', String(input.startHour))
  params.set('durationMinutes', String(input.durationMinutes))
  if (input.notes) params.set('notes', input.notes)
  // convenience for backend messages if you want to use it
  params.set('minHours', String(minHours))

  const url = `${bookingApiUrl}?${params.toString()}`
  const data = await requestApi<BookResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Booking failed')
  return data
}

