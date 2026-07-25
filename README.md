# NorthPeak Digital

A responsive one-page site for a fictional Shopify & web development agency,
built for the Digital Heroes Web Development qualification task (Role 05).

**Live site:** _add your deployed Vercel URL here_

## Stack

Vanilla HTML, CSS, and JavaScript — no framework, no build step, no page
builders. Chosen deliberately: the brief scores code quality/semantics, and
a framework would add nothing a hand-written static page can't do better
for a project this size.

## Structure

```
index.html        Markup — header/nav, hero, stats, services, results,
                   pricing, contact form, footer
css/styles.css     All styling, design tokens as CSS custom properties,
                   responsive rules at 1024px / 768px / 480px
js/main.js         Mobile nav toggle, contact form validation, footer year
```

## Running locally

No build step. Either:

- Open `index.html` directly in a browser, or
- Serve it with any static file server, e.g. `npx http-server -p 5500 -s`
  then visit `http://localhost:5500`

## Design decisions

1. **CSS/SVG mockup graphics instead of stock photos.** The hero "browser
   window" and results-section thumbnails are drawn with CSS gradients and
   inline SVG rather than raster images, so the page ships with zero image
   requests — good for both originality and Lighthouse performance.
2. **System font stack, no web font.** Avoids a render-blocking font
   request entirely; the trade-off (less distinctive type) was worth it
   for load speed on a task explicitly graded on performance.
3. **Definite widths over `max-width` + `auto` margins on grid items.**
   Centering a capped-width grid item with `max-width` + `margin: auto`
   makes it shrink-to-fit instead of stretching-then-capping (a real bug
   caught during testing — see below). Using `width: min(480px, 100%)`
   instead keeps the box a definite size at every viewport.

## Testing notes

The page was checked with a headless Chromium session (Puppeteer) across
360px / 768px / 1440px viewports, plus the mobile nav toggle and the
contact form's validation and success states. That caught two real bugs
before they shipped:

- The mobile nav panel was rendering on desktop too — `[hidden]` was being
  overridden by an equal-specificity author rule (`.mobile-nav { display:
  flex }`). Fixed with `.mobile-nav[hidden] { display: none }`.
- The hero visual collapsed to ~76px wide at 768px instead of 480px — a
  `max-width` + `margin-inline: auto` grid item shrinks to fit its content
  instead of stretching first. Fixed with an explicit `width`.

## Where AI was used

I used Claude to scaffold the initial HTML/CSS/JS from a reference layout
I chose myself (a template screenshot), and to set up the automated
browser testing (Puppeteer) that caught the two responsive-layout bugs
described above. I wrote the actual copy, chose the service list and
pricing tiers to match a Shopify/web agency positioning, picked the
colour and type system, and reviewed every section against the brief's
requirements myself before treating it as done.

---

Built for Digital Heroes Training Task
