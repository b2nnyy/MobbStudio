import { rates, depositPercent, minHours } from '@/lib/constants';

export default function PricingTable() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-background-secondary border border-primary/10 rounded-lg p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-2 text-primary">With Engineer</h3>
        <p className="text-3xl font-bold mb-4 text-primary">
          ${rates.withEngineer}
          <span className="text-lg font-normal text-primary/70">/hour</span>
        </p>
        <p className="text-sm text-primary/70">
          Professional engineer included for guidance and technical support
        </p>
      </div>

      <div className="bg-background-secondary border border-primary/10 rounded-lg p-6 md:p-8">
        <h3 className="text-xl font-semibold mb-2 text-primary">Without Engineer</h3>
        <p className="text-3xl font-bold mb-4 text-primary">
          ${rates.withoutEngineer}
          <span className="text-lg font-normal text-primary/70">/hour</span>
        </p>
        <p className="text-sm text-primary/70">
          Self-service studio access for experienced users
        </p>
      </div>

      <div className="md:col-span-2 bg-background-secondary border border-primary/10 rounded-lg p-6 md:p-8">
        <h3 className="text-lg font-semibold mb-4 text-primary">Booking Requirements</h3>
        <ul className="space-y-2 text-sm text-primary/70">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Minimum booking: {minHours} hours</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Deposit: {depositPercent}% required to confirm</span>
          </li>
        </ul>
      </div>
    </div>
  );
}


