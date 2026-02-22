import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

export function Gear() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Gear"
        title="Gear"
        description="Gear list with photos coming soon."
      />

      <div className="mt-10">
        <Card>
          <CardBody>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Gear list with photos is coming soon. DM us on Instagram if you have any questions.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

