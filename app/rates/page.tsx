import { Metadata } from 'next';
import Section from '@/components/Section';
import PricingTable from '@/components/PricingTable';
import Button from '@/components/Button';
import { instagramUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Rates',
  description: 'Transparent pricing for recording studio services at Mobb Studios.',
};

export default function RatesPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Rates
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Simple, transparent pricing for all services
          </p>
        </div>
        <PricingTable />
        <div className="mt-8 text-center">
          <p className="text-sm text-primary/60 mb-6">
            Rates may change. DM for special requests or package deals.
          </p>
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
    </>
  );
}

