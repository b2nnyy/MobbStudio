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

export async function fetchBusyHours(dateIso: string, roomId: StudioRoomId): Promise<number[]> {
  const url = `${bookingApiUrl}?mode=busy&date=${encodeURIComponent(dateIso)}&room=${encodeURIComponent(
    roomId,
  )}`
  const data = await jsonp<BusyResponse>(url)
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
  const data = await jsonp<HoldResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to create hold')
  if (!data.holdId) throw new Error('Hold created but no holdId returned')
  return { holdId: data.holdId, expiresAt: data.expiresAt }
}

export async function listHolds(adminToken: string): Promise<HoldRecord[]> {
  const url = `${bookingApiUrl}?mode=list&token=${encodeURIComponent(adminToken)}`
  const data = await jsonp<ListHoldsResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to load holds')
  return Array.isArray(data.holds) ? data.holds : []
}

export async function confirmHold(holdId: string, adminToken: string): Promise<void> {
  const url = `${bookingApiUrl}?mode=confirm&holdId=${encodeURIComponent(
    holdId,
  )}&token=${encodeURIComponent(adminToken)}`
  const data = await jsonp<SimpleOkResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to confirm hold')
}

export async function cancelHold(holdId: string, adminToken: string): Promise<void> {
  const url = `${bookingApiUrl}?mode=cancel&holdId=${encodeURIComponent(
    holdId,
  )}&token=${encodeURIComponent(adminToken)}`
  const data = await jsonp<SimpleOkResponse>(url)
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
  const data = await jsonp<BookResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Booking failed')
  return data
}

