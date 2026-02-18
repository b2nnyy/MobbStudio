import { mapEmbedUrl } from '../lib/constants'

export function MapEmbed({
  title = 'Map embed',
  src = mapEmbedUrl,
}: {
  title?: string
  src?: string
}) {
  return (
    <div className="aspect-[16/10] w-full bg-zinc-900">
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

