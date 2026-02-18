import { Link } from 'react-router-dom'
import {
  instagramHandle,
  instagramUrl,
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
        description={`Transparent pricing at ${studioName}. Bookings are handled through Instagram DMs.`}
      />

      <div className="mt-10">
        <PricingTable />
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <p className="text-sm text-zinc-300">
          Rates may change. DM for special requests.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Book via Instagram
        </h2>
        <p className="mt-2 text-sm text-zinc-300">
          DM us your date, start time, service, and how many hours you want.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <ButtonExternalLink href={instagramUrl}>
            DM {instagramHandle}
          </ButtonExternalLink>
          <ButtonLink to="/services">See services</ButtonLink>
          <Link className="self-center text-sm text-zinc-300 hover:text-white" to="/policies">
            Policies →
          </Link>
        </div>
      </section>
    </div>
  )
}

