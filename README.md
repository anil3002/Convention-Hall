KS Convention Hall – Single Page Website

Overview
- Mobile-first, accessible SPA built with Vite, React 19, TypeScript, and Tailwind CSS v4.
- Goal: Showcase venue and collect enquiries via WhatsApp.

Stack
- React 19 (Document Metadata for title/meta)
- TypeScript
- Tailwind CSS v4 (via @import "tailwindcss")
- Vite
- react-router-dom (anchors within a single page)
- React Hook Form + Zod

Getting Started
1) Install dependencies
   npm install

2) Start dev server
   npm run dev

3) Build for production
   npm run build

Project Structure
- index.html: Google Fonts + base OG/Twitter tags
- vite.config.ts: Vite + path aliases
- tsconfig.json: TS options + path aliases
- package.json: Scripts and deps
- src/
  - main.tsx: App bootstrap
  - App.tsx: Page composition + React Metadata + JSON-LD
  - components/
    - Header.tsx: Sticky nav with skip link + mobile menu
    - Hero.tsx: Tagline and primary CTAs
    - About.tsx: Venue overview
    - Amenities.tsx: Key features
    - Gallery.tsx: Lazy images + lightbox
    - Pricing.tsx: Simple pricing cards
    - LocationMap.tsx: Google Maps embed + directions
    - EnquiryForm.tsx: WhatsApp form with validation and fallback
    - Footer.tsx: Contacts and ©
    - Toast.tsx: ARIA live-region for toasts
  - lib/
    - whatsapp.ts: Build encoded WhatsApp message/link
    - validation.ts: Zod schema + types
  - styles/
    - globals.css: Tailwind import, variables, utilities
  - assets/images/: Real images (logo + photos)

WhatsApp Enquiry
- On submit, opens https://wa.me/919700029590 with a prefilled message.
- Inline validation with Zod; focuses the first invalid field.
- Shows a toast when opening WhatsApp.
- Popup blocked fallback: shows message with Copy and tel: link.

Accessibility
- Semantic landmarks, skip link, visible focus styles.
- Mobile menu with aria-expanded.
- Lightbox is keyboard operable and closes on Escape; simple focus trap.
- Form inputs use aria-invalid and aria-describedby for errors.

Performance
- Lazy-loaded gallery images; basic responsive sizes/srcset hints.
- Images below the fold are lazy-loaded; minimal scripts; no analytics.

SEO
- React Metadata: title, description, OG/Twitter tags, and JSON-LD LocalBusiness.
- index.html includes base OG/Twitter tags; image tags are added by React.

Replacing Content
- Update copy in components (About, Amenities, Pricing) as needed.
- Replace images in src/assets/images (keep filenames or update imports).
- Adjust contact number or WhatsApp in lib/whatsapp.ts and Footer/Hero.

Deploying
- Any static host will work (Vercel, Netlify, GitHub Pages).
- Build with npm run build; deploy the dist/ directory.

Notes
- Tailwind v4 utilities are used throughout; globals.css imports Tailwind.
- No backend; all features run client-side.

