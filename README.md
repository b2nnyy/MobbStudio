# Mobb Studios — Studio Website

Responsive, production-ready static website for **Mobb Studios** built with **Vite + React + TypeScript + Tailwind CSS** (no backend). Booking is handled through the site’s **Book** page (custom calendar UI + Google Calendar). Instagram is for questions/support.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Routing & GitHub Pages

- Uses **`HashRouter`** (safe for GitHub Pages refresh/deep links).
- Asset base path is configured in [`vite.config.ts`](vite.config.ts) as:
  - Default: `./` (works for `/<repo>/` and custom domains)
  - Override for project pages: set `VITE_BASE_PATH`

Example (project pages at `https://<user>.github.io/<repo>/`):

```bash
VITE_BASE_PATH=/<repo>/ npm run build
```

## Updating site-wide content

Edit constants in:

- [`src/lib/constants.ts`](src/lib/constants.ts)

This includes:
- Instagram handle + URL
- Rates
- Deposit percent + minimum hours
- Map embed placeholder URL
- Booking embed URL (Google Appointment Schedule)

## Connect booking to Google Calendar (Appointment Schedules)

This site is static (GitHub Pages compatible). To connect bookings to Google Calendar without a custom backend, use **Google Calendar Appointment schedules**.

### Steps (Google Calendar)

1. In Google Calendar, create an **Appointment schedule** for “Mobb Studios Sessions”.
2. Set **duration** to **2 hours** (to enforce the minimum booking time).
3. Set availability (you asked for **24/7**). If Google’s UI doesn’t allow full 24/7 blocks, set the closest schedule you want and adjust later.
4. Set **Minimum scheduling notice** to **2 hours** (clients can’t book within two hours of the start time).
5. (Optional) Add buffer time, meeting notes/questions, confirmation emails, etc.
6. Copy the **booking page link** / **embed link**.

### Paste the URL into the site

Open [`src/lib/constants.ts`](src/lib/constants.ts) and replace:

- `bookingEmbedUrl`

Then the site’s **Book** page will show the live calendar.

## Custom booking calendar (Apps Script)

If you want a fully custom calendar UI (time-slot grid) without managing CORS, the site can call a **Google Apps Script Web App** using **JSONP** (same pattern as your `b2nny.com` site).

### What you need

- A Google Calendar named something like **Mobb Studios — Bookings**
- Share that calendar with employees (so everyone can see bookings)
- A Google Apps Script Web App that reads/writes events on that calendar
- Paste your Web App URL into `bookingApiUrl` in `src/lib/constants.ts`

### Web App URL

Update:

- `bookingApiUrl` in `src/lib/constants.ts`

### Required Apps Script endpoints

Your Web App must support:

- `GET ?mode=busy&date=YYYY-MM-DD` → returns `{ ok:true, busyHours:[0..23] }`
- `GET ?mode=book&name=...&phone=...&instagram=...&date=YYYY-MM-DD&startHour=0..23&durationMinutes=...` → creates an event and returns `{ ok:true }`

### 24/7 + rule enforcement

The frontend enforces:
- minimum session length: **2 hours**
- minimum advance notice: **2 hours**
- 60-minute start increments

Your Apps Script should also enforce the same rules server-side.

## Missing assets checklist (client to provide later)

- Studio photos
- Portfolio links
- Email address
- Phone number
- Exact map pin or address (to replace the placeholder embed)
- Any additional policies to share before/after booking
- Future booking platform choice (if you want to replace the current booking flow)
