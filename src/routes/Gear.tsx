import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

export function Gear() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Gear"
        title="Gear highlights"
        description="A few staples we reach for often. Full list coming soon."
      />

      <div className="mt-10">
        <Card>
          <CardBody>
            <ul className="space-y-3 text-sm text-zinc-300">
              {[
                'Yamaha HS8 monitors',
                'Neumann TLM 102',
                'Neve 1073 style preamp',
              ].map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-zinc-400">Full list coming soon.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

