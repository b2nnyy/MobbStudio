# Client Checklist - Items Still Needed

This document lists what you still need to provide to complete the website.

## Required Items

### 1. Studio Photos
- [ ] Hero/header images for the home page
- [ ] Studio interior photos
- [ ] Equipment/gear photos
- [ ] Photos for portfolio section (when ready)

### 2. Portfolio/Work Samples
- [ ] Links to released tracks you've worked on
- [ ] Portfolio section content
- [ ] Client testimonials (if desired)

### 3. Contact Information
- [ ] Email address (currently marked as "Coming soon")
- [ ] Phone number (currently marked as "Coming soon")

### 4. Location Details
- [ ] Exact address or map pin coordinates
- [ ] Update `mapEmbedUrl` in `lib/constants.ts` with actual Google Maps embed URL
- [ ] Parking information
- [ ] Access instructions (building entry, floor, etc.)

### 5. Additional Policies
- [ ] Cancellation policy details
- [ ] Late arrival policy
- [ ] Any other studio-specific rules or guidelines

### 6. Booking Platform Integration (Future)
- [ ] Choose booking platform (Calendly, Acuity, custom solution, etc.)
- [ ] Update booking CTAs to link to booking platform instead of Instagram DM
- [ ] Note: The current UI is designed to easily swap Instagram DM links for booking platform links

## Quick Update Guide

Most content can be updated in `lib/constants.ts`:
- Studio name
- Instagram handle/URL
- Rates
- Services descriptions
- Map embed URL
- Deposit percentage
- Minimum booking hours

## Next Steps

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Review the site at `http://localhost:3000`
4. Update constants in `lib/constants.ts` as needed
5. Add photos to appropriate sections
6. Replace placeholder map embed URL
7. Deploy when ready!


