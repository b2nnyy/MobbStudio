import { bookingApiUrl, minHours } from './constants'
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

export async function fetchBusyHours(dateIso: string): Promise<number[]> {
  const url = `${bookingApiUrl}?mode=busy&date=${encodeURIComponent(dateIso)}`
  const data = await jsonp<BusyResponse>(url)
  if (!data.ok) throw new Error(data.error || 'Failed to load availability')
  return Array.isArray(data.busyHours) ? data.busyHours : []
}

export async function bookSession(input: {
  name: string
  phone: string
  instagram: string
  date: string // YYYY-MM-DD
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

