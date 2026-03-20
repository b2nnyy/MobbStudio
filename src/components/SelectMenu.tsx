import { useEffect, useMemo, useRef, useState } from 'react'

type SelectOption = {
  value: string
  label: string
}

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function SelectMenu({
  id,
  value,
  onChange,
  options,
  className,
  buttonClassName,
}: {
  id: string
  value: string
  onChange: (nextValue: string) => void
  options: SelectOption[]
  className?: string
  buttonClassName?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const listId = `${id}-listbox`

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value]
  )

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (!rootRef.current?.contains(target)) setOpen(false)
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <div ref={rootRef} className={cx('relative', className)}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          'flex w-full min-w-44 items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-sm text-zinc-900 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-zinc-950/60 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
          buttonClassName
        )}
      >
        <span className="truncate pr-2">{selected?.label ?? 'Select'}</span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cx('h-4 w-4 shrink-0 transition', open ? 'rotate-180' : '')}
        >
          <path
            d="M5.5 7.5L10 12l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border border-zinc-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-zinc-950"
        >
          {options.map((option) => {
            const active = option.value === value
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={cx(
                  'w-full rounded-md px-3 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
                  active
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950'
                    : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white'
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
