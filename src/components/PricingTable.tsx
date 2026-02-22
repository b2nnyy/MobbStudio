import { depositPercent, minHours, rooms } from '../lib/constants'
import { Card, CardBody } from './Card'

export function PricingTable() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardBody className="p-6">
              <p className="text-sm text-zinc-400">{room.name}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                ${room.hourlyRate}/hr
              </p>
              <p className="mt-2 text-sm text-zinc-300">Studio session (engineer included).</p>
            </CardBody>
          </Card>
        ))}
      </div>

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

