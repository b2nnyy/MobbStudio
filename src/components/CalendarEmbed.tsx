import { bookingEmbedUrl } from '../lib/constants'

export function CalendarEmbed({
  title = 'Booking calendar',
  src = bookingEmbedUrl,
}: {
  title?: string
  src?: string
}) {
  return (
    <div className="aspect-[16/12] w-full bg-zinc-900">
      <iframe
        className="h-full w-full"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  )
}

