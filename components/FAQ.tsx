'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQ({ items, className = '' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-background-secondary border border-primary/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-primary pr-4">{item.question}</span>
              <span
                className={`text-primary/70 text-xl transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                ↓
              </span>
            </button>
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 pb-4 text-primary/70 text-sm md:text-base"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


