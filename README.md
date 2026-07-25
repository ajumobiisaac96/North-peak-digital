# NorthPeak Digital

A responsive one-page site for a fictional Shopify & web development agency,
built for the Digital Heroes Web Development qualification task (Role 05).

**Live site:** https://north-peak-digital-five.vercel.app/

**Task B (Lighthouse):** [docs/CHANGELOG.md](docs/CHANGELOG.md) — Performance
95-96, Accessibility 100. Screenshot: [docs/lighthouse-scores.png](docs/lighthouse-scores.png),
full report: [docs/lighthouse-report.html](docs/lighthouse-report.html).

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

1. **Custom SVG illustrations instead of stock photography**, for every
   image except the small team-avatar circles (RandomUser.me). Each result
   card gets a hand-drawn icon tied to that client's actual industry — a
   skincare bottle for Solstice Skincare, a house for Hearth & Home, a
   dumbbell for Vantage Fitness, a coffee cup for Coastal Coffee — on a
   topic-matched gradient, so nothing on the page is decorative-but-random.
   I tried real photos first (Picsum, then keyword-searched LoremFlickr)
   and rejected both: Picsum's photos were unrelated to their sections, and
   LoremFlickr's keyword matching was unreliable enough to return an
   abstract logo graphic for a "fitness,gym" query. Illustrations gave me
   full control over relevance, and they're vector, so they're crisp at
   any size and add near-zero page weight.
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
described above. When the first pass of imagery turned out to be
generic stock photos with no connection to the content, I redirected it
twice — first to try keyword-matched photos, then, once those proved
unreliable, to replace them with the hand-drawn SVG icon per case study
described above. I wrote the actual copy, chose the service list and
pricing tiers to match a Shopify/web agency positioning, picked the
colour and type system, and reviewed every section against the brief's
requirements myself before treating it as done.

Later, I asked for a redesign pass modeled on a site I liked — which turned
out to be digitalheroesco.com, Digital Heroes' own live site. Claude flagged
that copying the reviewer's own homepage structure was a bad idea (it cuts
against "make it unmistakably yours," and it's the kind of thing the actual
reviewers would recognize immediately), and proposed pulling out the
underlying design *language* instead — punchier problem-led hero copy,
numbered section labels, bolder stat callouts, metric-led case study cards —
applied to NorthPeak's own original one-page structure rather than copying
Digital Heroes' multi-thousand-pixel marketing site wholesale. I agreed with
that read and went with it; the current hero copy, section numbering, and
result-card layout are the result.

---

Built for Digital Heroes Training Task
