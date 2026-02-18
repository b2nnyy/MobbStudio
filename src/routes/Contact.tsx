import { useId, useState } from 'react'
import { instagramHandle, instagramUrl } from '../lib/constants'
import { ButtonExternalLink } from '../components/Button'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

export function Contact() {
  const nameId = useId()
  const messageId = useId()
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Contact"
        title="Book through Instagram"
        description="Primary booking method: Instagram DMs only."
      />

      <div className="mt-6">
        <ButtonExternalLink href={instagramUrl}>DM {instagramHandle}</ButtonExternalLink>
      </div>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Other contact methods
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-zinc-400">Email</dt>
                <dd className="mt-1 text-zinc-200">Coming soon</dd>
              </div>
              <div>
                <dt className="text-zinc-400">Phone</dt>
                <dd className="mt-1 text-zinc-200">Coming soon</dd>
              </div>
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Quick message (coming soon)
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              This form does not send yet. Please DM us on Instagram to book.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <div>
                <label className="text-sm text-zinc-200" htmlFor={nameId}>
                  Name
                </label>
                <input
                  id={nameId}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  placeholder="Coming soon"
                  autoComplete="name"
                  disabled
                />
              </div>
              <div>
                <label className="text-sm text-zinc-200" htmlFor={messageId}>
                  Message
                </label>
                <textarea
                  id={messageId}
                  className="mt-2 min-h-28 w-full resize-y rounded-lg border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  placeholder="Coming soon"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-zinc-950"
                  type="submit"
                  disabled
                >
                  Send (coming soon)
                </button>
                <a
                  className="text-sm text-zinc-300 hover:text-white"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DM instead →
                </a>
              </div>

              {submitted ? (
                <p className="text-sm text-zinc-300">
                  Please DM us on Instagram to book (form sending is coming soon).
                </p>
              ) : null}
            </form>
          </CardBody>
        </Card>
      </section>
    </div>
  )
}

