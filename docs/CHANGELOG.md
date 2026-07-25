# Optimization changelog — Task B

Audited with Lighthouse (Performance + Accessibility) via CLI against a
local static server, then confirmed against the live Vercel deployment.
Screenshots and the full report are in this folder.

## Baseline

First audit, before any Task B changes: **Performance 98, Accessibility 96**.
Already high because of choices made in Task A — no web font (no
render-blocking font request), no images except tiny inline SVG (near-zero
payload), and semantic HTML with a real `<form>`/`<label>` structure. That
baseline bought the site most of its performance headroom for free; Task B
was mainly about closing the accessibility gap.

## What I changed

1. **Text contrast on accent-orange elements.** `.eyebrow` labels and
   `.service-tag` chips used `--accent-dark` (`#E5511F`) as text color on
   light backgrounds — only ~3.8:1 contrast, below the 4.5:1 WCAG AA
   minimum for normal-size text. Added a new token, `--accent-text`
   (`#C2410C`), used only for text-on-light contexts, which measures
   ~5.2:1. *Bought:* every orange label on the page is now legible for
   low-vision users, not just decoratively on-brand.

2. **White text on orange buttons.** `.btn-primary` and `.price-badge`
   used white text on the `--accent` orange background — only ~2.85:1
   contrast, well under the minimum even for large bold text. Switched
   the text color to `--ink` (near-black) instead of white, which hits
   ~6.6:1 against both the default and hover (`--accent-dark`) button
   backgrounds. *Bought:* every CTA button (`Start a Project`,
   `Get a Quote`, `Submit`, etc.) is now actually readable, not just
   colorful — this was the single biggest-impact fix since it's every
   primary action on the page.

3. **Footer logo contrast.** The "Digital" half of the wordmark
   (`.logo-thin`) inherited the light-mode muted gray (`#66655C`), which
   drops to ~3.1:1 against the near-black footer background. Added a
   `.footer-brand .logo-thin` override using the lighter gray
   (`#C9C8C0`) already used for the rest of the footer text. *Bought:*
   consistent, readable branding in the one place it was silently failing.

4. **"Label in Name" mismatch (WCAG 2.5.3).** The logo link had
   `aria-label="NorthPeak Digital home"` — the word "home" doesn't appear
   in the visible text, so a voice-control user saying "click NorthPeak
   Digital" wouldn't reliably land on it. Removed the redundant
   `aria-label` entirely; the visible "NorthPeak Digital" text now serves
   as the accessible name directly, so it can't drift out of sync again.
   *Bought:* one fewer maintenance trap, and correct behavior for
   voice-control and some screen-reader "read the label" shortcuts.

5. **Missing space in the wordmark markup.** "NorthPeak" and "Digital"
   were adjacent text nodes with only a CSS `margin-left` between them —
   visually spaced, but the accessible text was literally
   "NorthPeakDigital" run together. Added a real space character in the
   markup. *Bought:* correct pronunciation/parsing for screen readers,
   independent of CSS.

## Result

**Performance 95-96, Accessibility 100** (0 failing audits), confirmed on
a clean run after clearing out orphaned Chrome processes from earlier CLI
runs — one intermediate reading briefly showed Performance 78 purely from
local CPU contention during testing, not a real regression; re-running on
an idle machine reproduced 95-96 consistently.

## What I'd do next with another day

Run a11y and performance passes on a throttled connection (Slow 4G) to
sanity-check the "1.2s average load" claim in the stats strip actually
holds under worse network conditions, and add a `prefers-contrast: more`
media query for users who want even higher contrast than AA minimums.
