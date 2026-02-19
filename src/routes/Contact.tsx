import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneTel,
  instagramHandle,
  instagramUrl,
} from '../lib/constants'
import { ButtonExternalLink, ButtonLink } from '../components/Button'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

export function Contact() {
  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Contact"
        title="Questions or special requests?"
        description="Book sessions from the booking calendar. For questions, DM us on Instagram."
      />

      <div className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/book">Book a session</ButtonLink>
          <ButtonExternalLink href={instagramUrl} variant="secondary">
            DM {instagramHandle}
          </ButtonExternalLink>
        </div>
      </div>

      <section className="mt-10">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Other contact methods
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-zinc-400">Email</dt>
                <dd className="mt-1">
                  <a
                    className="text-zinc-200 underline decoration-white/30 hover:text-white hover:decoration-white"
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-zinc-400">Phone</dt>
                <dd className="mt-1">
                  <a
                    className="text-zinc-200 underline decoration-white/30 hover:text-white hover:decoration-white"
                    href={`tel:${contactPhoneTel}`}
                  >
                    {contactPhoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </section>
    </div>
  )
}

