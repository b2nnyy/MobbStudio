import { mapEmbedUrl } from '../lib/constants'

export function MapEmbed({
  title = 'Map embed',
  src = mapEmbedUrl,
  onClick,
  clickLabel = 'Open directions',
}: {
  title?: string
  src?: string
  onClick?: () => void
  clickLabel?: string
}) {
  return (
    <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900">
      <iframe
        className="h-full w-full"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={clickLabel}
          className="absolute inset-0 cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950"
        />
      ) : null}
    </div>
  )
}

