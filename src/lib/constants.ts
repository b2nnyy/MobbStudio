export const studioName = 'Mobb Studios'

export const instagramHandle = '@mobbstudios'
export const instagramUrl = 'https://instagram.com/mobbstudios'

export const contactEmail = 'studios.mobb@gmail.com'

// Display format for UI + an E.164-ish value for tel: links.
export const contactPhoneDisplay = '(470) 534-7681'
export const contactPhoneTel = '+14705347681'

export type StudioRoomId = 'A' | 'B'

export const rooms: Array<{
  id: StudioRoomId
  name: string
  hourlyRate: number
}> = [
  { id: 'A', name: 'Room A', hourlyRate: 60 },
  { id: 'B', name: 'Room B', hourlyRate: 40 },
] as const

export function getRoomById(id: StudioRoomId) {
  const room = rooms.find((r) => r.id === id)
  if (!room) throw new Error(`Unknown room id: ${id}`)
  return room
}

export const depositPercent = 50
export const minHours = 2

// Booking (Google Appointment Schedule)
// Paste your Google Appointment Schedule embed URL here when ready.
export const bookingEmbedUrl = 'https://calendar.google.com/calendar/appointments/schedules/PLACEHOLDER'

// Optional: non-iframe booking page URL (can be the same as embed destination).
export const bookingPageUrl = bookingEmbedUrl

// Booking rule: clients must book at least this many hours in advance.
export const minAdvanceHours = 2

// Booking (Custom calendar + Google Apps Script Web App)
// This is the Web App "exec" URL from Apps Script deployment.
export const bookingApiUrl =
  'https://script.google.com/macros/s/AKfycbzBv_QprRT0NpTeAerKmmElolarlDI2vkUEn608hYmGdilo8SBTPW2wY3TELHcJkuC2Ww/exec'

export const cashAppUrl = 'https://cash.app/$Mobbstudios'

export const studioAddress = '3247 Kensington Ave, Philadelphia, PA 19134'

export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  studioAddress
)}`

export const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(studioAddress)}`

// Embeddable map view for the Location page.
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  studioAddress
)}&output=embed`

