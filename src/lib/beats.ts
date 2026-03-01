export type Beat = {
  id: string
  title: string
  /**
   * Public URL path to the audio file, e.g. `/beats/my-beat-1.mp3`
   * Files should live in `public/beats/`.
   */
  src: string
}

/**
 * Beat samples (streaming only).
 *
 * Add your audio files under `public/beats/` and then list them here.
 */
export const beats: Beat[] = [
  // Example:
  // { id: 'beat-1', title: 'Beat 1', src: '/beats/beat-1.mp3' },
]

