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
import { PricingTable } from '../components/PricingTable'
import { SectionHeader } from '../components/Section'

export function Rates() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Rates"
        title="Studio rates"
        description={`Room A and Room B pricing at ${studioName}. Book from the calendar, and DM us if you have questions.`}
      />

      <div className="mt-10">
        <PricingTable />
      </div>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-medium text-zinc-950 dark:text-white">Quick summary:</span>{' '}
          {rooms.map((r) => `${r.name} $${r.hourlyRate}/hr`).join(' · ')} · Deposit is {depositPercent}% of
          total cost · Minimum booking is {minHours} hours.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Rates may change. DM for special requests.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          Book a session
        </h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          Use the booking calendar to pick a time. If you have special requests, DM us.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/book">Open booking calendar</ButtonLink>
          <ButtonExternalLink href={instagramUrl} variant="secondary">
            Questions? DM {instagramHandle}
          </ButtonExternalLink>
          <ButtonLink to="/services">See services</ButtonLink>
          <Link className="self-center text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" to="/policies">
            Policies →
          </Link>
        </div>
      </section>
    </div>
  )
}

