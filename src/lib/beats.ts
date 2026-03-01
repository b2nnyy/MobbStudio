export type Beat = {
  id: string
  title: string
  /**
   * Public URL path to the audio file, e.g. `/beats/my-beat-1.mp3`
   * Files should live in `public/beats/`.
   */
  src: string
}

function beatSrc(fileName: string) {
  // Ensure spaces / special chars in filenames work reliably on GitHub Pages.
  return `/beats/${encodeURIComponent(fileName)}`
}

/**
 * Beat samples (streaming only).
 *
 * Add your audio files under `public/beats/` and then list them here.
 */
export const beats: Beat[] = [
  { id: 'clips-prodbymobb', title: 'Clips @Prodbymobb', src: beatSrc('Clips @Prodbymobb.mp3') },
  { id: 'created-prodbymobb', title: 'Created @Prodbymobb', src: beatSrc('Created @Prodbymobb.mp3') },
  { id: 'dolce-prodbymobb', title: 'Dolce @Prodbymobb', src: beatSrc('Dolce @Prodbymobb.mp3') },
  { id: 'kop-150-bpm-prodbymobb', title: 'KOP 150 bpm @Prodbymobb', src: beatSrc('KOP 150 bpm @Prodbymobb.mp3') },
]

