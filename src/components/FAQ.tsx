import { Card, CardBody } from './Card'

export type FAQItem = {
  question: string
  answer: string
}

export function FAQ({
  items,
}: {
  items: FAQItem[]
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((item) => (
        <Card key={item.question}>
          <CardBody className="p-6">
            <h3 className="text-base font-semibold text-zinc-950 dark:text-white">{item.question}</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{item.answer}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

