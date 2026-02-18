import { depositPercent, minHours, rates } from '../lib/constants'
import { Card, CardBody } from './Card'

export function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <div className="grid gap-0 sm:grid-cols-2">
          <CardBody className="border-b border-white/10 p-6 sm:border-b-0 sm:border-r sm:border-white/10">
            <p className="text-sm text-zinc-400">With engineer</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              ${rates.withEngineerHourly}/hr
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              Recommended for faster sessions and cleaner results.
            </p>
          </CardBody>
          <CardBody className="p-6">
            <p className="text-sm text-zinc-400">Without engineer</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              ${rates.withoutEngineerHourly}/hr
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              For experienced clients who can run their own session.
            </p>
          </CardBody>
        </div>
      </Card>

      <div className="grid gap-4">
        <Card>
          <CardBody className="p-6">
            <p className="text-sm text-zinc-400">Deposit</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {depositPercent}% required
            </p>
            <p className="mt-2 text-sm text-zinc-300">Locks in the session time.</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <p className="text-sm text-zinc-400">Minimum booking</p>
            <p className="mt-2 text-lg font-semibold text-white">{minHours} hours</p>
            <p className="mt-2 text-sm text-zinc-300">DM for scheduling options.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

