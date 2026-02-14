import { Metadata } from 'next';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { services, instagramUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Professional tracking, mixing, and mastering services at Mobb Studios.',
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Services
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Professional audio services tailored to your needs
          </p>
        </div>
      </Section>

      {/* Tracking */}
      <Section>
        <Card title={services.tracking.title} className="max-w-4xl mx-auto">
          <p className="text-primary/70 mb-6">{services.tracking.description}</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-primary">What's included:</h4>
              <ul className="space-y-2 text-sm text-primary/70">
                {services.tracking.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>High-quality recording environment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Professional monitoring setup</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      {/* Mixing */}
      <Section className="bg-background-secondary">
        <Card title={services.mixing.title} className="max-w-4xl mx-auto">
          <p className="text-primary/70 mb-6">{services.mixing.description}</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-primary">What's included:</h4>
              <ul className="space-y-2 text-sm text-primary/70">
                {services.mixing.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Industry-standard mixing tools and plugins</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Multiple revision rounds</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">
                For remote mixing, send us:
              </h4>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All individual tracks/stems (WAV or AIFF format)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reference tracks if you have specific direction</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Any notes or preferences for the mix</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-primary/60 mt-4">
              Remote mixing and mastering available. DM for details and turnaround
              times.
            </p>
          </div>
        </Card>
      </Section>

      {/* Mastering */}
      <Section>
        <Card title={services.mastering.title} className="max-w-4xl mx-auto">
          <p className="text-primary/70 mb-6">{services.mastering.description}</p>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-primary">What's included:</h4>
              <ul className="space-y-2 text-sm text-primary/70">
                {services.mastering.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Final polish and loudness optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Format delivery for your distribution needs</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">
                For remote mastering, send us:
              </h4>
              <ul className="space-y-2 text-sm text-primary/70">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Final stereo mix (WAV or AIFF, 24-bit recommended)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reference tracks for style direction</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Any specific requirements or notes</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-primary/60 mt-4">
              Remote mixing and mastering available. DM for details and turnaround
              times.
            </p>
          </div>
        </Card>
      </Section>

      {/* CTA */}
      <Section className="bg-background-secondary">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Ready to get started?
          </h2>
          <p className="text-primary/70 mb-8 max-w-2xl mx-auto">
            DM us on Instagram to book your session or ask any questions
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

