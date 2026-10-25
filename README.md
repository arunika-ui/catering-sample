# Catering website template

A one-page catering website (Next.js, TypeScript, Tailwind CSS, GSAP) built to be re-branded for any caterer in a few minutes.

## Re-brand for a new caterer

1. Open `src/site.config.ts` and replace every value marked **⚠ REPLACE** — name, city, phone, WhatsApp number, email, address, service areas, page title.
2. Swap the sample menus, occasions and live counters for the caterer's real ones.
3. Only add stats (`intro.stats`), reviews (`testimonials`), social links and an established year if they are real. Empty lists hide their section.
4. Change `theme` colours to suit their brand (keep `accent` dark enough to read on the cream background).
5. Add photos (below), then run `npm run build`.

## Photos

**Colour-graded (recommended):** put originals in `/photos-raw`, list them in `photos-raw/map.txt` as `<file> <slot>`, then run `python3 scripts/grade-images.py`. Every photo gets the same warm grade so mixed sources look like one shoot, and is resized into `/public/images`.

**Plain resize:** name originals after the slots below and run `npm run images`.

Any missing photo shows a labelled placeholder.

| Slot | Shape | Ideal subject |
|---|---|---|
| `hero` | landscape | Best wide shot: a lit buffet or dinner setup at an evening event |
| `story-1` | portrait | Chef or team at work |
| `story-2` | landscape | Close-up of a signature dish |
| `occasion-weddings`, `-sangeet`, `-corporate`, `-private`, `-outdoor` | portrait | One per event type |
| `menu-indian`, `-global`, `-desserts`, `-beverages` | portrait | One per cuisine tab |
| `stations` | landscape | A live counter or buffet in action |
| `gallery-01` … `gallery-12` | any | Mix of food, setups and events |

You can reuse a photo in several slots by pointing the config at the same file.

## Enquiry form

- **Default:** the form validates the details, then opens WhatsApp with the enquiry written out for the visitor to send. It works with no setup.
- **Email delivery:** create a free form endpoint (Formspree, Getform or Web3Forms), then build with
  `NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxx npm run build`.
  The form then posts there and shows real success or error messages.

## Commands

```
npm install
npm run dev       # local preview at http://localhost:3000
npm run images    # optimise photos from /photos-raw
npm run build     # static site in /out — upload that folder to any host
```
