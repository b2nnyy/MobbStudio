import { Link } from 'react-router-dom'
import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneTel,
  depositPercent,
  instagramHandle,
  instagramUrl,
  minHours,
  rooms,
  studioAddress,
  studioName,
} from '../lib/constants'
import { ButtonLink } from '../components/Button'
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
              Book a session in minutes. Choose your room, pick a time, and lock it in.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  Minimum booking: <span className="text-zinc-950 dark:text-white">{minHours} hours</span>
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  <span className="text-zinc-950 dark:text-white">{depositPercent}% non-refundable deposit</span>{' '}
                  required to lock in your session
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Payment methods: Cash, Cash App, Zelle, Apple Pay</span>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink to="/book">Book a session</ButtonLink>
              <ButtonLink to="/rates" variant="secondary">
                View rates
              </ButtonLink>
              <ButtonLink to="/location" variant="secondary">
                Location
              </ButtonLink>
              <a
                className="text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Questions? DM {instagramHandle} →
              </a>
            </div>

            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Returning client?{' '}
              <Link className="underline decoration-zinc-400/50 hover:decoration-zinc-500 dark:decoration-white/30 dark:hover:decoration-white" to="/book">
                Book now
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 dark:border-white/10">
        <div className="container-pad py-14 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Choose your room
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Pick a room, then choose your date + time on the booking page.
              </p>
            </div>
            <Link
              className="text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              to="/rates"
            >
              Full rates →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {rooms.map((room) => (
              <Card key={room.id}>
                <CardBody className="p-6">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{room.name}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                    ${room.hourlyRate}/hr
                  </p>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                    Studio session (engineer included). Minimum {minHours} hours.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink to={`/book?room=${room.id}`}>Book {room.name}</ButtonLink>
                    <ButtonLink to="/rates" variant="secondary">
                      View details
                    </ButtonLink>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">Location</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{studioAddress}</p>
                <div className="mt-3">
                  <ButtonLink to="/location" variant="secondary">
                    Open map
                  </ButtonLink>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">Policies</p>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {depositPercent}% non-refundable deposit · late arrivals charged by booked time · file storage 30 days
                </p>
                <div className="mt-3">
                  <ButtonLink to="/policies" variant="secondary">
                    Read policies
                  </ButtonLink>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-950 dark:text-white">Contact</p>
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <a
                      className="text-zinc-800 underline decoration-zinc-400/50 hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
                      href={`mailto:${contactEmail}`}
                    >
                      {contactEmail}
                    </a>
                  </p>
                  <p>
                    <a
                      className="text-zinc-800 underline decoration-zinc-400/50 hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
                      href={`tel:${contactPhoneTel}`}
                    >
                      {contactPhoneDisplay}
                    </a>
                  </p>
                  <p>
                    <a
                      className="text-zinc-800 underline decoration-zinc-400/50 hover:text-zinc-950 hover:decoration-zinc-500 dark:text-zinc-200 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DM {instagramHandle}
                    </a>
                  </p>
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
                  Choose your room, date, and start time.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="font-medium text-zinc-950 dark:text-white">Step 2</p>
                <p className="mt-1">
                  Submit your details to request the booking.
                </p>
              </li>
              <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                <p className="font-medium text-zinc-950 dark:text-white">Step 3</p>
                <p className="mt-1">Pay your deposit to lock in your session, then arrive ready.</p>
              </li>
            </ol>

            <div className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/book">Book a session</ButtonLink>
                <ButtonLink to="/policies" variant="secondary">
                  Policies
                </ButtonLink>
                <ButtonLink to="/contact" variant="secondary">
                  Contact
                </ButtonLink>
              </div>
            </div>
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
                Tracking, mixing, and mastering—kept simple.
              </p>
            </div>
            <Link
              className="text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
              to="/services"
            >
              See details →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Tracking',
                bullets: ['Comfortable vibe, focused takes', 'Engineer included'],
              },
              {
                title: 'Mixing',
                bullets: ['Clean, punchy mixes', 'Remote available (handled via DM)'],
              },
              {
                title: 'Mastering',
                bullets: ['Final polish for release', 'Remote available (handled via DM)'],
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
                  question: 'Which room should I choose?',
                  answer:
                    'Pick the room that fits your budget and vibe. Both rooms are booked hourly with an engineer included.',
                },
                {
                  question: 'What to bring to a session?',
                  answer:
                    'Bring your files, notes, and references. If you have questions, DM us before you arrive.',
                },
                {
                  question: 'Need help finding a time?',
                  answer:
                    'DM us on Instagram and we’ll help you find the right slot.',
                },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

