import { useEffect, useMemo, useRef, useState } from 'react'
import { beats } from '../lib/beats'
import { Card, CardBody } from '../components/Card'
import { SectionHeader } from '../components/Section'

function formatTime(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '0:00'
  const s = Math.floor(totalSeconds)
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export function Beats() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const activeBeat = useMemo(
    () => (activeId ? beats.find((b) => b.id === activeId) ?? null : null),
    [activeId],
  )

  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const onTime = () => setCurrentTime(el.currentTime || 0)
    const onMeta = () => setDuration(el.duration || 0)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('durationchange', onMeta)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onEnded)

    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('durationchange', onMeta)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onEnded)
    }
  }, [])

  async function loadAndPlay(src: string) {
    const el = audioRef.current
    if (!el) return
    setCurrentTime(0)
    setDuration(0)
    el.pause()
    el.currentTime = 0
    el.src = src
    try {
      await el.play()
    } catch {
      // Autoplay can be blocked; user can hit play again.
    }
  }

  function toggleBeat(id: string) {
    const beat = beats.find((b) => b.id === id)
    const el = audioRef.current
    if (!beat || !el) return

    if (activeId === id) {
      if (el.paused) {
        void el.play()
      } else {
        el.pause()
      }
      return
    }

    setActiveId(id)
    void loadAndPlay(beat.src)
  }

  function onSeek(nextTime: number) {
    const el = audioRef.current
    if (!el) return
    el.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  return (
    <div className="container-pad py-14 sm:py-16">
      <SectionHeader
        eyebrow="Beats"
        title="Beat samples"
        description="Stream samples of our sound. Not for purchase."
      />

      <audio ref={audioRef} preload="metadata" />

      <div className="mt-10">
        {beats.length === 0 ? (
          <Card>
            <CardBody>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Beat samples coming soon.
              </p>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                Add files under <span className="font-medium">public/beats</span> and list them in{' '}
                <span className="font-medium">src/lib/beats.ts</span>.
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="grid gap-3">
            {beats.map((b) => {
              const active = b.id === activeId
              return (
                <Card key={b.id} className={active ? 'ring-2 ring-emerald-300/60' : undefined}>
                  <CardBody className="p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
                          {b.title}
                        </p>
                        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                          {activeBeat?.id === b.id ? (isPlaying ? 'Now playing' : 'Paused') : 'Sample'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleBeat(b.id)}
                          className={[
                            'inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                            'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
                            'dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
                          ].join(' ')}
                          aria-label={active && isPlaying ? `Pause ${b.title}` : `Play ${b.title}`}
                        >
                          {active && isPlaying ? 'Pause' : 'Play'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                      <input
                        type="range"
                        min={0}
                        max={Math.max(0, active ? duration : 0)}
                        value={active ? Math.min(currentTime, duration || 0) : 0}
                        step={0.1}
                        onChange={(e) => {
                          if (!active) return
                          onSeek(Number(e.target.value))
                        }}
                        disabled={!active || !Number.isFinite(duration) || duration <= 0}
                        className="w-full accent-emerald-500"
                        aria-label={`Seek ${b.title}`}
                      />

                      <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                        <span>{active ? formatTime(currentTime) : '0:00'}</span>
                        <span>{active ? formatTime(duration) : '0:00'}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

