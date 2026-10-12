# TASLEEH — Planned Maintenance landing page

Single-page lead-generation site for TASLEEH Facilities Management (part of Tiger Holding).
One conversion: book a post-summer property survey. Secondary action: call 800 222 333.

React 19 + Vite + Tailwind CSS v4, Lucide icons, Inter from Google Fonts. The production build is
prerendered to static HTML (`scripts/prerender.js`) and hydrated on the client.

## Run

```bash
npm install
cp .env.example .env   # fill in the values below
npm run dev            # http://localhost:5173
npm run build          # outputs dist/ (static, deploy anywhere)
npm run preview
```

## Configuration (`.env`)

| Variable | Purpose |
| --- | --- |
| `VITE_FORM_WEBHOOK` | Endpoint that receives the survey form as a JSON `POST`. **Required in production** — without it submissions show an error asking the visitor to call. In dev the payload is logged instead. |
| `VITE_SITE_URL` | Absolute page URL for canonical, Open Graph and JSON-LD. Defaults to `https://tasleeh.net/planned-maintenance/`. |
| `VITE_GA4_ID` | GA4 measurement ID. |
| `VITE_META_PIXEL_ID` | Meta Pixel ID. Fires `PageView`, and `Lead` on a successful submission. |
| `VITE_LINKEDIN_PARTNER_ID` / `VITE_LINKEDIN_CONVERSION_ID` | LinkedIn Insight Tag and the conversion fired on a successful submission. |
| `VITE_WHATSAPP_NUMBER` | Shows the floating WhatsApp button (hidden while empty). |

Tags with no ID never load. Configured tags load after the `load` event so they don't hurt Lighthouse.

### Form payload

`full_name, company, role, email, mobile, property_type, location, size, maintenance_setup,
preferred_week, utm_source, utm_medium, utm_campaign, utm_content, page_url, submitted_at`

### GA4 events

| Event | Params |
| --- | --- |
| `cta_click` | `label`: `hero`, `band`, `faq`, `footer`, `sticky` (`location`: `header` or `mobile_bar` for sticky) |
| `call_click` | `location` |
| `form_start` | — (first focus in the form) |
| `form_submit_success` | `property_type`, `role` |

## Brand assets

`public/brand/` holds the supplied TASLEEH logo (plus a white version for navy backgrounds and
favicons cut from the mark) and the supplied App Store and Google Play badges.
`badge-appgallery.svg` is a stand-in styled to match; swap in Huawei's official badge.

## Photos

Every photo slot is listed in `src/images.js` (name, aspect ratio, widths, alt text and a short
description of the shot). To add or replace photos:

1. Save the originals in `photos-src/` named after the slot: `hero.jpg`, `audience.jpg`,
   `svc-mep.jpg`, `svc-fabric.jpg`, `svc-soft.jpg`, `svc-fitout.jpg`, `survey.jpg`, `app.jpg`,
   `about.jpg`. Optional focal point: `hero.focus` containing e.g. `0.5 0.3`.
2. Run `python3 scripts/process_photos.py`. It crops to each slot's ratio, writes WebP files at
   every width into `public/images/`, and rebuilds `og.webp` from the hero.
3. Update the slot's `alt` in `src/images.js` so it describes the actual photo.

Slots without a source photo get a neutral tonal placeholder.

## Copy and structured data

FAQ copy lives in `src/content.js` and feeds both the visible accordion and the FAQPage JSON-LD
(injected at build time by `vite.config.js`), so they always match.

## Accessibility notes

- `#F2A900` amber is never used for text on white. The darker `#B37E00` is 3.56:1 on white, which
  passes AA only for large text and icons, so on white it's used only for step numerals, ticks and
  service icons — never for small text.
- Visible amber focus rings (navy on the amber band), labelled inputs, inline errors announced via
  `aria-describedby`, focus moved to the first invalid field.
