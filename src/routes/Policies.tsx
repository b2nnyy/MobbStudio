import { depositPercent, minHours } from '../lib/constants'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

export function Policies() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Policies"
        title="Booking policies"
        description="Keep it simple and respectful. Additional policies will be shared in DM."
      />

      <div className="mt-10">
        <Card>
          <CardBody>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Minimum booking {minHours} hours</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>{depositPercent}% deposit required</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Rescheduling: DM as soon as possible</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span>Additional policies shared in DM</span>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

