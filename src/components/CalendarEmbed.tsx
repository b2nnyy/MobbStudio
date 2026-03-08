import { useState } from 'react'
import { LoadingSpark } from './Button'
import { bookingEmbedUrl } from '../lib/constants'

export function CalendarEmbed({
  title = 'Booking calendar',
  src = bookingEmbedUrl,
}: {
  title?: string
  src?: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[16/12] w-full overflow-hidden bg-zinc-900">
      {!loaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white shadow-[0_0_32px_rgba(255,255,255,0.08)] backdrop-blur-sm dark:bg-white/5">
            <LoadingSpark label="Loading calendar" />
          </div>
        </div>
      ) : null}
      <iframe
        className={`h-full w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  )
}

