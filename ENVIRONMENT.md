# Environment variables

This project is built with Vite, so any variables exposed to the client must be prefixed with `VITE_`.

## Booking API

- `VITE_BOOKING_API_URL`: Google Apps Script Web App **exec** URL (defaults to the hardcoded URL in `src/lib/constants.ts`).

Example:

```bash
VITE_BOOKING_API_URL="https://script.google.com/macros/s/REPLACE_ME/exec"
```

