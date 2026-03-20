import { useState } from 'react'
import { ButtonLink } from '../components/Button'
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

function arrowButtonClass() {
  return 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-xl font-semibold text-zinc-800 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950'
}

export function Gallery() {
  const [activeRoom, setActiveRoom] = useState<RoomTab>('A')
  const [photoIndexByRoom, setPhotoIndexByRoom] = useState<Record<RoomTab, number>>({
    A: 0,
    B: 0,
  })
  const [brokenPhotos, setBrokenPhotos] = useState<Record<string, boolean>>({})
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const photos = roomPhotos[activeRoom]
  const activeIndex = photoIndexByRoom[activeRoom]
  const activeSrc = photos[activeIndex]
  const roomLabel = activeRoom === 'A' ? 'A Room' : 'B Room'
  const activePhotoBroken = Boolean(brokenPhotos[activeSrc])

  function movePhoto(direction: -1 | 1) {
    setPhotoIndexByRoom((prev) => {
      const currentIndex = prev[activeRoom]
      const nextIndex = (currentIndex + direction + photos.length) % photos.length
      return { ...prev, [activeRoom]: nextIndex }
    })
  }

  function setActiveRoomAndReset(room: RoomTab) {
    setActiveRoom(room)
    setPhotoIndexByRoom((prev) => ({ ...prev, [room]: 0 }))
  }

  function markPhotoBroken(src: string) {
    setBrokenPhotos((prev) => ({ ...prev, [src]: true }))
  }

  function handleViewerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      movePhoto(-1)
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      movePhoto(1)
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.changedTouches[0]?.clientX ?? null)
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null) return
    const endX = event.changedTouches[0]?.clientX
    if (typeof endX !== 'number') {
      setTouchStartX(null)
      return
    }

    const distance = endX - touchStartX
    const swipeThreshold = 40
    if (Math.abs(distance) < swipeThreshold) {
      setTouchStartX(null)
      return
    }

    if (distance > 0) {
      movePhoto(-1)
      setTouchStartX(null)
      return
    }
    movePhoto(1)
    setTouchStartX(null)
  }

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
          onClick={() => setActiveRoomAndReset('A')}
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
          onClick={() => setActiveRoomAndReset('B')}
        >
          B Room
        </button>
      </div>

      <div
        className="mt-6"
        role="tabpanel"
        id={activeRoom === 'A' ? 'room-panel-a' : 'room-panel-b'}
        aria-labelledby={activeRoom === 'A' ? 'room-tab-a' : 'room-tab-b'}
      >
        <Card className="mx-auto w-full max-w-5xl">
          <CardBody>
            <div
              className="relative select-none caret-transparent"
              tabIndex={0}
              onKeyDown={handleViewerKeyDown}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label={`${roomLabel} photo carousel`}
            >
              {activePhotoBroken ? (
                <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-600 dark:border-white/20 dark:bg-white/5 dark:text-zinc-300">
                  Upload a photo to <span className="ml-1 font-mono text-xs">{activeSrc}</span>
                </div>
              ) : (
                <img
                  src={activeSrc}
                  alt={`${roomLabel} studio view ${activeIndex + 1}`}
                  className="aspect-[16/10] w-full rounded-xl object-cover"
                  loading="lazy"
                  onError={() => markPhotoBroken(activeSrc)}
                />
              )}

              <button
                type="button"
                className={`${arrowButtonClass()} absolute top-1/2 left-3 -translate-y-1/2`}
                aria-label={`Previous ${roomLabel} photo`}
                onClick={() => movePhoto(-1)}
              >
                &#8592;
              </button>
              <button
                type="button"
                className={`${arrowButtonClass()} absolute top-1/2 right-3 -translate-y-1/2`}
                aria-label={`Next ${roomLabel} photo`}
                onClick={() => movePhoto(1)}
              >
                &#8594;
              </button>
            </div>

            <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-300">
              {roomLabel} - Photo {activeIndex + 1} of {photos.length}
            </p>
            <div className="mt-5 flex justify-center">
              <ButtonLink to={`/book?room=${activeRoom}`}>
                {activeRoom === 'A' ? 'Book A Room' : 'Book B Room session'}
              </ButtonLink>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
