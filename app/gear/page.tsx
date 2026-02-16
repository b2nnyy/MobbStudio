import { Metadata } from 'next';
import Section from '@/components/Section';
import Card from '@/components/Card';

export const metadata: Metadata = {
  title: 'Gear',
  description: 'Professional recording equipment at Mobb Studios.',
};

const gearItems = [
  {
    name: 'Yamaha HS8 Monitors',
    description: 'Professional studio monitors for accurate mixing and monitoring',
  },
  {
    name: 'Neumann TLM 102',
    description: 'Premium large-diaphragm condenser microphone',
  },
  {
    name: 'Neve 1073 Style Preamp',
    description: 'Classic analog preamp for warm, professional sound',
  },
];

export default function GearPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Gear Highlights
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Professional equipment for professional results
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {gearItems.map((item, index) => (
              <Card key={index} title={item.name}>
                <p className="text-sm text-primary/70">{item.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-primary/60">
              Full gear list coming soon
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}


