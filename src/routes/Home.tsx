import { Link } from 'react-router-dom'
import {
  depositPercent,
  instagramHandle,
  instagramUrl,
  minHours,
  rooms,
  studioName,
} from '../lib/constants'
import { ButtonExternalLink, ButtonLink } from '../components/Button'
import { Card, CardBody } from '../components/Card'
import { FAQ } from '../components/FAQ'

export function Home() {
  return (
    <div>
      <section className="border-b border-zinc-200 dark:border-white/10">
        <div className="container-pad py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-widest text-zinc-600 uppercase dark:text-zinc-400">
              Recording studio
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
              {studioName}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              Tracking, mixing, mastering.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/book">Book a session</ButtonLink>
              <ButtonExternalLink href={instagramUrl} variant="secondary">
                DM {instagramHandle}
              </ButtonExternalLink>
              <ButtonLink to="/rates" variant="secondary">
                View rates
              </ButtonLink>
            </div>

            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Photos and portfolio coming soon.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-white/10">
        <div className="container-pad py-14 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Services
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Clear, simple options—book right from the calendar.
              </p>
            </div>
            <Link className="text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" to="/services">
              See details
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Tracking',
                bullets: ['Comfortable vibe, focused takes', 'Engineer available'],
              },
              {
                title: 'Mixing',
                bullets: ['Clean, punchy mixes', 'Revisions handled via DM'],
              },
              {
                title: 'Mastering',
                bullets: ['Loud without losing clarity', 'Ready for streaming'],
              },
            ].map((card) => (
              <Card key={card.title}>
                <CardBody className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">{card.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-white/10">
        <div className="container-pad py-14 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Rates
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Minimum {minHours} hours. {depositPercent}% non-refundable deposit required to lock in.
              </p>

              <div className="mt-6 grid gap-3">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                  >
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{room.name}</p>
                    <p className="mt-2 text-2xl font-semibold text-zinc-950 dark:text-white">
                      ${room.hourlyRate}/hr
                    </p>
                    <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      Studio session (engineer included).
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                  Ready to book?
                </h3>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  Pick a time in the booking calendar. DM us if you have questions.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <ButtonLink to="/book">Open booking calendar</ButtonLink>
                  <ButtonLink to="/rates" variant="secondary">
                    Go to rates
                  </ButtonLink>
                  <ButtonExternalLink href={instagramUrl} variant="secondary">
                    Questions? DM {instagramHandle}
                  </ButtonExternalLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-white/10">
        <div className="container-pad py-14 sm:py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              How booking works
            </h2>
            <ol className="mt-6 space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="font-medium text-zinc-950 dark:text-white">Step 1</p>
                <p className="mt-1">
                  Open the booking calendar and choose a date + start time.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="font-medium text-zinc-950 dark:text-white">Step 2</p>
                <p className="mt-1">
                  Submit your details. We’ll follow up with deposit info if needed.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="font-medium text-zinc-950 dark:text-white">Step 3</p>
                <p className="mt-1">Lock in your session and arrive ready.</p>
              </li>
            </ol>

            <div className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/book">Book a session</ButtonLink>
                <ButtonExternalLink href={instagramUrl} variant="secondary">
                  Questions? DM {instagramHandle}
                </ButtonExternalLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-pad py-14 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                FAQ
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Quick answers—DM us if you have questions.
              </p>
            </div>
            <Link className="text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" to="/policies">
              Policies
            </Link>
          </div>

          <div className="mt-8">
            <FAQ
              items={[
                {
                  question: 'Do you require a deposit?',
                  answer: `Yes—${depositPercent}% non-refundable deposit is required to lock in your session.`,
                },
                {
                  question: 'Minimum booking time?',
                  answer: `Minimum booking is ${minHours} hours.`,
                },
                {
                  question: 'Are sessions booked with an engineer?',
                  answer: 'Yes—all sessions are currently booked with an engineer included.',
                },
                {
                  question: 'Remote mixing and mastering?',
                  answer:
                    'Yes—remote work is available. Details are handled through DMs.',
                },
                {
                  question: 'What to bring to a session?',
                  answer:
                    'Bring your files, notes, and references. If you have questions, DM us before you arrive.',
                },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

