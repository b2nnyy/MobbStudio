import { depositPercent, minHours } from '../lib/constants'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

export function Policies() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Policies"
        title="Booking policies"
        description="Please read before booking."
      />

      <div className="mt-10 grid gap-4">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">Deposit</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  <span className="text-white">{depositPercent}% non-refundable deposit</span> required to
                  lock in your session.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Minimum booking: {minHours} hours.</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">Late arrivals</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Session time begins at the scheduled booking time, not arrival time.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  Late arrivals will not receive extra time unless the schedule allows, and additional fees
                  may apply.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  Sessions ending late due to client delay will still be charged the full booked time.
                </span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">Payment methods</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {['Cash', 'Cash App', 'Zelle', 'Apple Pay'].map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">File delivery</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Rough mixes may be provided after the session.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  The studio is not responsible for storing files beyond 30 days. Clients should back up
                  their files.
                </span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">Studio rules & conduct</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Respect all equipment and staff. Clients are responsible for any damages caused.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  No illegal activity, weapons, or violence permitted on the premises.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Smoking policies must be followed according to studio rules.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>
                  The studio reserves the right to end sessions without refund if rules are violated.
                </span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">Guests</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Limit guests to a reasonable number to maintain a productive environment.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Clients are responsible for their guests’ behavior.</span>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

