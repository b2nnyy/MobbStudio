import { depositPercent, minHours, rooms } from '../lib/constants'
import { Card, CardBody } from './Card'

export function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardBody className="p-6">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{room.name}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                ${room.hourlyRate}/hr
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                Studio session (engineer included).
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid gap-4">
        <Card>
          <CardBody className="p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Deposit</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">
              {depositPercent}% of total cost
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              Non-refundable. Locks in the session time.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Minimum booking</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950 dark:text-white">{minHours} hours</p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">DM for scheduling options.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

