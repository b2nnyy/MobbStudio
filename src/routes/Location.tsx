import { useEffect, useState } from 'react'
import { appleMapsUrl, googleMapsUrl, instagramUrl, studioAddress } from '../lib/constants'
import { MapEmbed } from '../components/MapEmbed'
import { SectionHeader } from '../components/Section'
import { Button, ButtonExternalLink } from '../components/Button'

export function Location() {
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    if (!pickerOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setPickerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [pickerOpen])

  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Location"
        title="Find us"
        description="Tap the map to open directions, or choose Apple Maps / Google Maps below."
      />

      <section className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <MapEmbed
          title={`${studioAddress} map`}
          clickLabel="Choose Apple Maps or Google Maps"
          onClick={() => setPickerOpen(true)}
        />
        <div className="border-t border-zinc-200 p-6 text-sm text-zinc-700 dark:border-white/10 dark:text-zinc-300">
          <p className="font-medium text-zinc-950 dark:text-white">{studioAddress}</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <ButtonExternalLink href={appleMapsUrl} variant="secondary">
              Open in Apple Maps
            </ButtonExternalLink>
            <ButtonExternalLink href={googleMapsUrl} variant="secondary">
              Open in Google Maps
            </ButtonExternalLink>
            <Button type="button" variant="ghost" onClick={() => setPickerOpen(true)}>
              Choose…
            </Button>
          </div>
          <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
            Need help?{' '}
            <a
              className="underline decoration-zinc-400/50 hover:decoration-zinc-500 dark:decoration-white/30 dark:hover:decoration-white"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              DM us on Instagram
            </a>
            .
          </p>
        </div>
      </section>

      {pickerOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Choose map app"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPickerOpen(false)
          }}
        >
          <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-zinc-950">
            <p className="text-sm font-semibold text-zinc-950 dark:text-white">Open directions</p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{studioAddress}</p>
            <div className="mt-4 grid gap-2">
              <ButtonExternalLink href={appleMapsUrl} variant="secondary">
                Apple Maps
              </ButtonExternalLink>
              <ButtonExternalLink href={googleMapsUrl} variant="secondary">
                Google Maps
              </ButtonExternalLink>
              <Button type="button" variant="ghost" onClick={() => setPickerOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          Parking & access
        </h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Coming soon.</p>
      </section>
    </div>
  )
}

