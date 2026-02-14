import { Metadata } from 'next';
import Section from '@/components/Section';
import MapEmbed from '@/components/MapEmbed';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Location',
  description: 'Find Mobb Studios location and directions.',
};

export default function LocationPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Location
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Find us and get directions
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <MapEmbed />
        </div>
      </Section>

      <Section className="bg-background-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Parking">
              <p className="text-sm text-primary/60">Coming soon</p>
            </Card>
            <Card title="Access">
              <p className="text-sm text-primary/60">Coming soon</p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}

