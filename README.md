# Mobb Studios Website

A modern, responsive website for Mobb Studios - a professional recording studio offering tracking, mixing, and mastering services.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── services/
│   ├── rates/
│   ├── policies/
│   ├── gear/
│   ├── location/
│   └── contact/
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MapEmbed.tsx
│   ├── PricingTable.tsx
│   └── Section.tsx
└── lib/
    └── constants.ts        # All studio constants
```

## Features

- ✅ Fully responsive design
- ✅ Accessible components with keyboard navigation
- ✅ SEO optimized with Next.js metadata
- ✅ Dark theme with modern UI
- ✅ Instagram DM booking integration
- ✅ All content managed through constants file

## Customization

All studio-specific content is managed in `lib/constants.ts`. Update this file to change:
- Studio name
- Instagram handle/URL
- Rates
- Services
- Map embed URL
- Deposit and minimum booking requirements

## Client Checklist

The following items still need to be provided:

- [ ] Studio photos
- [ ] Portfolio links/work samples
- [ ] Email address
- [ ] Phone number
- [ ] Exact map pin or address (currently using placeholder)
- [ ] Any additional policies (cancellation fees, etc.)
- [ ] Booking platform choice (when ready to integrate)

## Notes

- The contact form is for demonstration only and does not send emails. All bookings should go through Instagram DMs.
- The map embed URL is currently a placeholder. Replace it in `lib/constants.ts` when the exact location is available.
- Email and phone fields are marked as "Coming soon" until contact information is available.

