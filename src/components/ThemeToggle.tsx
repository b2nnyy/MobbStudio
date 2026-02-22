import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  // Prefer explicit choice, otherwise fall back to current document state (set by index.html script)
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // ignore
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function applyTheme(next: Theme) {
  const isDark = next === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', isDark ? '#09090b' : '#ffffff')
  try {
    localStorage.setItem('theme', next)
  } catch {
    // ignore
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    // If something else toggles the class (unlikely), resync on mount.
    setTheme(getInitialTheme())
  }, [])

  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(nextTheme)
        applyTheme(nextTheme)
      }}
      className={[
        'inline-flex items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
        'dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-zinc-200 dark:focus-visible:ring-offset-zinc-950',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}

