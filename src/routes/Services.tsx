import { Link } from 'react-router-dom'
import { instagramHandle, instagramUrl, studioName } from '../lib/constants'
import { ButtonExternalLink, ButtonLink } from '../components/Button'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

function ServiceSection({
  title,
  description,
  bullets,
}: {
  title: string
  description: string
  bullets: string[]
}) {
  return (
    <Card>
      <CardBody>
        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{description}</p>
        <ul className="mt-5 space-y-2 text-sm text-zinc-300">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}

export function Services() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Services"
        title={`What we do at ${studioName}`}
        description="Tracking, mixing, and mastering—kept simple. To book, DM us on Instagram."
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <ButtonExternalLink href={instagramUrl}>DM {instagramHandle}</ButtonExternalLink>
        <ButtonLink to="/rates">View rates</ButtonLink>
        <Link className="self-center text-sm text-zinc-300 hover:text-white" to="/contact">
          Contact →
        </Link>
      </div>

      <div className="mt-10 grid gap-4">
        <ServiceSection
          title="Tracking"
          description="Record vocals, instruments, or full sessions in a relaxed, focused environment."
          bullets={[
            'Engineer available (recommended for faster sessions)',
            'Bring your session files and references',
            'We’ll help you get clean takes quickly',
          ]}
        />

        <ServiceSection
          title="Mixing"
          description="Mixes that translate—clean, punchy, and intentional. Remote mixing is available and handled through DMs."
          bullets={[
            'What to send: consolidated stems or multitracks from bar 1',
            'Include tempo/BPM, key notes, and rough mix reference',
            'Label tracks clearly (kick, snare, lead vox, etc.)',
            'If you’re unsure, DM us and we’ll guide the export',
          ]}
        />

        <ServiceSection
          title="Mastering"
          description="Final polish for release. Remote mastering is available and handled through DMs."
          bullets={[
            'What to send: final mix WAV/AIFF (no limiter preferred)',
            'Leave headroom (avoid clipping), export at your session sample rate',
            'Include a reference track + target platform (Spotify/Apple/YouTube)',
            'We’ll confirm deliverables (instrumental, clean, etc.) in DM',
          ]}
        />
      </div>
    </div>
  )
}

