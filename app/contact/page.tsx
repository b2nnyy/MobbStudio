'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { instagramUrl, instagramHandle } from '@/lib/constants';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Contact
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Get in touch to book a session or ask questions
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Card title="Primary Contact Method">
            <div className="text-center mb-6">
              <p className="text-primary/70 mb-6">
                For bookings and inquiries, reach us on Instagram
              </p>
              <Button
                href={instagramUrl}
                external
                variant="primary"
                className="text-lg px-8 py-4"
                aria-label="Contact on Instagram"
              >
                {instagramHandle}
              </Button>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card title="Email">
              <p className="text-sm text-primary/60">Coming soon</p>
            </Card>
            <Card title="Phone">
              <p className="text-sm text-primary/60">Coming soon</p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="bg-background-secondary">
        <div className="max-w-2xl mx-auto">
          <Card title="Send a Message">
            {formSubmitted ? (
              <div className="text-center py-8">
                <p className="text-primary mb-4">
                  For bookings, please use Instagram DMs
                </p>
                <Button
                  href={instagramUrl}
                  external
                  variant="primary"
                  aria-label="Go to Instagram"
                >
                  Go to Instagram
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-background border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-background border border-primary/20 rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" variant="primary" aria-label="Submit message">
                    Submit
                  </Button>
                </div>
                <p className="text-xs text-primary/60 mt-4">
                  Note: This form is for demonstration. Please use Instagram DMs for
                  actual bookings.
                </p>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
}

