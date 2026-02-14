import Section from '@/components/Section';
import Button from '@/components/Button';
import Card from '@/components/Card';
import FAQ from '@/components/FAQ';
import PricingTable from '@/components/PricingTable';
import {
  studioName,
  instagramUrl,
  services,
  rates,
  depositPercent,
  minHours,
} from '@/lib/constants';

const faqItems = [
  {
    question: 'Do you require a deposit?',
    answer: `Yes, a ${depositPercent}% deposit is required to confirm your session.`,
  },
  {
    question: 'What is the minimum booking time?',
    answer: `The minimum booking is ${minHours} hours.`,
  },
  {
    question: 'Can I book without an engineer?',
    answer: `Yes, you can book the studio without an engineer for $${rates.withoutEngineer}/hour.`,
  },
  {
    question: 'Do you do remote mixing and mastering?',
    answer: 'Yes, we offer remote mixing and mastering services. DM us for details and turnaround times.',
  },
  {
    question: 'What should I bring to a session?',
    answer: 'Bring your tracks, stems, or any reference material. We provide all the recording equipment.',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 md:pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            {studioName}
          </h1>
          <p className="text-xl md:text-2xl text-primary/70 mb-8 text-balance">
            Tracking, mixing, mastering in a chill focused space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={instagramUrl}
              external
              variant="primary"
              aria-label="Book via Instagram DM"
            >
              Book via Instagram DM
            </Button>
            <Button href="/rates" variant="outline" aria-label="View rates">
              View rates
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary/60">
            Photos and portfolio coming soon
          </p>
        </div>
      </Section>

      {/* Services Preview */}
      <Section className="bg-background-secondary">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Services
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Professional audio services for your music
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title={services.tracking.title}>
            <ul className="space-y-2 text-sm text-primary/70">
              {services.tracking.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={services.mixing.title}>
            <ul className="space-y-2 text-sm text-primary/70">
              {services.mixing.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card title={services.mastering.title}>
            <ul className="space-y-2 text-sm text-primary/70">
              {services.mastering.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button href="/services" variant="outline" aria-label="View all services">
            View all services
          </Button>
        </div>
      </Section>

      {/* Rates Preview */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Rates
          </h2>
          <p className="text-primary/70 max-w-2xl mx-auto">
            Transparent pricing for all services
          </p>
        </div>
        <PricingTable />
        <div className="text-center mt-8">
          <Button href="/rates" variant="primary" aria-label="View full rates">
            View full rates
          </Button>
        </div>
      </Section>

      {/* How Booking Works */}
      <Section className="bg-background-secondary">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            How Booking Works
          </h2>
        </div>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">DM us on Instagram</h3>
              <p className="text-primary/70 text-sm">
                Send us a message with your preferred date, start time, and service
                you need.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">
                We confirm availability
              </h3>
              <p className="text-primary/70 text-sm">
                We'll check availability and send you deposit information to lock in
                your session.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Lock in and show up</h3>
              <p className="text-primary/70 text-sm">
                Once your deposit is confirmed, your session is locked in. Show up
                ready to create.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button
            href={instagramUrl}
            external
            variant="primary"
            aria-label="Book on Instagram"
          >
            Book on Instagram
          </Button>
        </div>
      </Section>

      {/* FAQ Preview */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
      </Section>
    </>
  );
}

