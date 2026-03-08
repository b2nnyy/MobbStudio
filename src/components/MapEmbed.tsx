import { useState } from 'react'
import { LoadingSpark } from './Button'
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
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900">
      {!loaded ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_55%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]">
          <div className="rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-3 text-sm text-zinc-900 shadow-[0_0_28px_rgba(0,0,0,0.08)] backdrop-blur-sm dark:border-white/10 dark:bg-black/20 dark:text-white dark:shadow-[0_0_28px_rgba(255,255,255,0.06)]">
            <LoadingSpark label="Loading map" />
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

