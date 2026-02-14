import { mapEmbedUrl } from '@/lib/constants';

export default function MapEmbed() {
  return (
    <div className="w-full">
      <div className="aspect-video w-full rounded-lg overflow-hidden border border-primary/10">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Studio Location"
          className="w-full h-full"
        />
      </div>
      <p className="mt-4 text-sm text-primary/70 text-center">
        Exact pin to be added. DM for directions.
      </p>
    </div>
  );
}

