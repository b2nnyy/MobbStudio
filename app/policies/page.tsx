import { Metadata } from 'next';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { minHours, depositPercent, instagramUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Booking policies and guidelines for Mobb Studios.',
};

export default function PoliciesPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Policies
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Clear guidelines for booking and sessions
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card title="Minimum Booking">
            <p className="text-primary/70">
              All sessions require a minimum booking of {minHours} hours.
            </p>
          </Card>

          <Card title="Deposit">
            <p className="text-primary/70 mb-4">
              A {depositPercent}% deposit is required to confirm your session. The
              deposit secures your booking time and will be applied to your total
              session cost.
            </p>
            <p className="text-sm text-primary/60">
              Deposit details will be shared when we confirm your booking via DM.
            </p>
          </Card>

          <Card title="Rescheduling">
            <p className="text-primary/70">
              Need to reschedule? DM us as soon as possible. We'll work with you to
              find a new time that works.
            </p>
          </Card>

          <Card title="Additional Policies">
            <p className="text-primary/70">
              Additional policies and details will be shared in DM when booking your
              session.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-background-secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Questions about our policies?
          </h2>
          <p className="text-primary/70 mb-6">
            DM us on Instagram and we'll be happy to clarify anything.
          </p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md font-medium bg-primary text-background hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
            aria-label="Contact on Instagram"
          >
            DM on Instagram
          </a>
        </div>
      </Section>
    </>
  );
}


