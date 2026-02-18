import { instagramUrl } from '../lib/constants'
import { MapEmbed } from '../components/MapEmbed'
import { SectionHeader } from '../components/Section'

export function Location() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Location"
        title="Find us"
        description="Location is public. Exact pin coming soon—DM for directions."
      />

      <section className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <MapEmbed title="Mobb Studios map (placeholder)" />
        <div className="border-t border-white/10 p-6 text-sm text-zinc-300">
          <p>
            Exact pin coming soon.{' '}
            <a
              className="underline decoration-white/30 hover:decoration-white"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              DM us for directions
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Parking & access
        </h2>
        <p className="mt-2 text-sm text-zinc-300">Coming soon.</p>
      </section>
    </div>
  )
}

