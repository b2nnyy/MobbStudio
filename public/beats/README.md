# Beats folder

Put your beat audio files in this folder, then add them to the list in:

- `src/lib/beats.ts`

Recommended formats:
- `.mp3` (best compatibility)
- `.wav` (bigger files)

Example entry:

```ts
{ id: 'beat-1', title: 'Beat 1', src: '/beats/beat-1.mp3' }
```

