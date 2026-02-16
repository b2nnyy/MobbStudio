'use client';

import { useMemo, useState } from 'react';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import Card from '@/components/Card';
import Button from '@/components/Button';
import {
  studioName,
  instagramUrl,
  minHours,
  depositPercent,
  bookingAdvanceHours,
  engineers,
} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Booking',
  description: 'Plan and request your session at Mobb Studios.',
};

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const getDateTimeFromSelection = (date: string, time: string) => {
  if (!date || !time) return null;
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  if (!year || month === undefined || !day) return null;
  const dt = new Date();
  dt.setFullYear(year, (month ?? 1) - 1, day);
  dt.setHours(hours ?? 0, minutes ?? 0, 0, 0);
  return dt;
};

const formatForGoogleCalendar = (start: Date, durationHours: number) => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const toUtc = (d: Date) => {
    const year = d.getUTCFullYear();
    const month = pad(d.getUTCMonth() + 1);
    const day = pad(d.getUTCDate());
    const hours = pad(d.getUTCHours());
    const minutes = pad(d.getUTCMinutes());
    return `${year}${month}${day}T${hours}${minutes}00Z`;
  };

  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  return { start: toUtc(start), end: toUtc(end) };
};

export default function BookingPage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(minHours.toString());
  const [service, setService] = useState('Tracking');
  const [engineer, setEngineer] = useState(engineers[0]?.id ?? '');
  const [socialHandle, setSocialHandle] = useState('');

  const selectedDateTime = useMemo(
    () => getDateTimeFromSelection(date, time),
    [date, time],
  );

  const now = new Date();
  const minBookingTime = new Date(
    now.getTime() + bookingAdvanceHours * 60 * 60 * 1000,
  );

  const isTooSoon =
    selectedDateTime !== null && selectedDateTime.getTime() < minBookingTime.getTime();

  const isValid = selectedDateTime !== null && !isTooSoon;

  const googleCalendarUrl = useMemo(() => {
    if (!isValid || !selectedDateTime) return '';
    const durationHours = Number(duration) || minHours;
    const { start, end } = formatForGoogleCalendar(selectedDateTime, durationHours);
    const text = encodeURIComponent(`${studioName} Session`);
    const details = encodeURIComponent(
      `Service: ${service}\nDuration: ${durationHours} hours\nEngineer: ${
        engineers.find((e) => e.id === engineer)?.name ?? 'Any available'
      }\nSocial handle: ${socialHandle || 'Not provided'}`,
    );
    const location = encodeURIComponent(studioName);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  }, [isValid, selectedDateTime, duration, service, engineer, socialHandle]);

  const summaryText = useMemo(() => {
    if (!isValid || !selectedDateTime) return '';
    const durationHours = Number(duration) || minHours;
    const engineerLabel =
      engineers.find((e) => e.id === engineer)?.name ?? 'Any available engineer';
    const localTime = selectedDateTime.toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `Hi, I'd like to book a session at ${studioName}.\n\nService: ${service}\nDate & time: ${localTime}\nDuration: ${durationHours} hours\nEngineer: ${engineerLabel}\nSocial handle: ${
      socialHandle || 'Not provided'
    }\n\nI understand a ${depositPercent}% deposit or full payment is required to confirm the time slot.`;
  }, [isValid, selectedDateTime, duration, service, engineer, socialHandle]);

  const totalHours = Number(duration) || minHours;

  return (
    <>
      <Section className="pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Book a Session
          </h1>
          <p className="text-lg text-primary-muted max-w-2xl mx-auto">
            Choose your time, duration, and engineer. Booking runs 24/7, all year.
          </p>
          <p className="mt-4 text-sm text-primary-muted">
            Note: This page helps you plan your booking. Final confirmation still
            happens over Instagram DMs.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card title="Session details" className="lg:col-span-2">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Service
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  >
                    <option>Tracking</option>
                    <option>Mixing</option>
                    <option>Mastering</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="engineer"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Engineer
                  </label>
                  <select
                    id="engineer"
                    value={engineer}
                    onChange={(e) => setEngineer(e.target.value)}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  >
                    {engineers.map((eng) => (
                      <option key={eng.id} value={eng.id}>
                        {eng.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Start time
                  </label>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium mb-2 text-primary"
                  >
                    Duration (hours)
                  </label>
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-primary/20 rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                  >
                    {[minHours, minHours + 1, minHours + 2, minHours + 4].map(
                      (h) => (
                        <option key={h} value={h}>
                          {h} hours
                        </option>
                      ),
                    )}
                  </select>
                  <p className="mt-1 text-xs text-primary-muted">
                    Minimum booking is {minHours} hours.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="social"
                  className="block text-sm font-medium mb-2 text-primary"
                >
                  Social media handle (optional)
                </label>
                <input
                  type="text"
                  id="social"
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3 py-2 border border-primary/20 rounded-md bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                />
                <p className="mt-1 text-xs text-primary-muted">
                  Helpful for us to recognize you, but not required.
                </p>
              </div>

              {isTooSoon && (
                <p className="text-sm text-primary-accent">
                  You can&apos;t book a session less than {bookingAdvanceHours} hours
                  before the time slot. Please choose a later time.
                </p>
              )}
            </form>
          </Card>

          <div className="space-y-6">
            <Card title="Booking rules">
              <ul className="space-y-2 text-sm text-primary-muted">
                <li>• Booking available 24/7, 365 days a year.</li>
                <li>• Minimum booking is {minHours} hours.</li>
                <li>
                  • You cannot book a session less than {bookingAdvanceHours} hours before
                  the selected time.
                </li>
                <li>
                  • A {depositPercent}% deposit or full amount is required to confirm
                  your time slot.
                </li>
              </ul>
            </Card>

            <Card title="Next steps">
              <p className="text-sm text-primary-muted mb-4">
                Once you&apos;ve chosen your time, send us the summary via Instagram DM.
              </p>
              <div className="space-y-3">
                <Button
                  href={instagramUrl}
                  external
                  variant="primary"
                  className="w-full"
                  aria-label="Open Instagram to book"
                >
                  Open Instagram
                </Button>
                {googleCalendarUrl && (
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md font-medium border border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary-accent text-sm"
                    aria-label="Add to Google Calendar"
                  >
                    Add to Google Calendar
                  </a>
                )}
              </div>
              <p className="mt-4 text-xs text-primary-muted">
                This tool doesn&apos;t send bookings directly. It helps you plan your
                session and add it to your calendar.
              </p>
            </Card>

            {summaryText && (
              <Card title="Copy for Instagram DM">
                <p className="text-xs text-primary-muted mb-2">
                  Copy this and paste it in your DM to {studioName}:
                </p>
                <textarea
                  readOnly
                  value={summaryText}
                  className="w-full text-xs bg-background-secondary border border-primary/20 rounded-md px-3 py-2 text-primary h-40"
                />
              </Card>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}


