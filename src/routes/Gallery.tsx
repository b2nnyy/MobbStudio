import { useMemo, useState } from 'react'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

type RoomTab = 'A' | 'B'

const roomPhotos: Record<RoomTab, string[]> = {
  A: ['/rooms/a-room-1.jpg', '/rooms/a-room-2.jpg', '/rooms/a-room-3.jpg'],
  B: ['/rooms/b-room-1.jpg', '/rooms/b-room-2.jpg', '/rooms/b-room-3.jpg'],
}

function tabClass(active: boolean) {
  return [
    'rounded-md border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
    active
      ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950'
      : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white',
  ].join(' ')
}

function RoomPhotoCard({
  src,
  roomLabel,
}: {
  src: string
  roomLabel: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Card>
        <CardBody>
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-600 dark:border-white/20 dark:bg-white/5 dark:text-zinc-300">
            Upload a photo to <span className="ml-1 font-mono text-xs">{src}</span>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        <img
          src={src}
          alt={`${roomLabel} studio view`}
          className="aspect-[4/3] w-full rounded-lg object-cover"
          loading="lazy"
          onError={() => setHasError(true)}
        />
      </CardBody>
    </Card>
  )
}

export function Gallery() {
  const [activeRoom, setActiveRoom] = useState<RoomTab>('A')
  const photos = useMemo(() => roomPhotos[activeRoom], [activeRoom])
  const roomLabel = activeRoom === 'A' ? 'A Room' : 'B Room'

  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Gallery"
        title="Studio Rooms"
        description="Browse each room before booking. Add your own photos by placing files inside public/rooms using the suggested filenames."
      />

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Studio room tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeRoom === 'A'}
          aria-controls="room-panel-a"
          id="room-tab-a"
          className={tabClass(activeRoom === 'A')}
          onClick={() => setActiveRoom('A')}
        >
          A Room
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeRoom === 'B'}
          aria-controls="room-panel-b"
          id="room-tab-b"
          className={tabClass(activeRoom === 'B')}
          onClick={() => setActiveRoom('B')}
        >
          B Room
        </button>
      </div>

      <div
        className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="tabpanel"
        id={activeRoom === 'A' ? 'room-panel-a' : 'room-panel-b'}
        aria-labelledby={activeRoom === 'A' ? 'room-tab-a' : 'room-tab-b'}
      >
        {photos.map((src) => (
          <RoomPhotoCard key={src} src={src} roomLabel={roomLabel} />
        ))}
      </div>
    </div>
  )
}
