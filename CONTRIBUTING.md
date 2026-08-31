# Contributing

Thanks for your interest in improving this project. This is a static HTML/CSS/JS
diagram with no build step, so most contributions can be tested by simply
opening `index.html` in a browser (or running a local static server, e.g.
`bunx serve .` or `python3 -m http.server`).

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

## Ways to contribute

### 1. Reporting layout or connector bugs

If an emblem is misaligned, a connector line points at the wrong node, the
diagram doesn't fit the screen correctly, or something breaks when resizing
the window or switching language, please open an issue using the
**Bug report** template.

Helpful things to include:

- Browser and OS (e.g. "Chrome 128 on macOS 15")
- Viewport size or device (desktop / tablet / mobile)
- Which order(s) or connector(s) are affected
- A screenshot if possible — for layout issues, this is worth far more than a
  description

### 2. Proposing corrections to order prerequisites or jurisdictions

This diagram maps a specific, commonly-used version of the Masonic appendant
body hierarchy, based on English/Irish constitutional practice. Prerequisite
structures, admission requirements, and even order names can vary by
jurisdiction and by Grand Lodge/Grand Chapter/Grand Council.

If you believe a `data-requires` link, a `data-faith` classification (all
faiths vs. Trinitarian Christian), or an order's emblem is inaccurate, please
open an issue using the **Content correction** template and include:

- The order(s) involved (use the name as shown in the diagram)
- What you believe is incorrect, and what it should be instead
- A source if you have one (an official Grand Lodge/Grand Chapter page, a
  published constitution, etc.) — this helps us evaluate jurisdiction-specific
  differences rather than treating one region's practice as universally wrong

If you're proposing a code change yourself, the relevant data lives in
`index.html`: each order is an `<article class="node" id="...">` with
`data-requires` (its prerequisite order id(s), space-separated if more than
one) and `data-faith` (`all` or `trinitarian`).

### 3. Contributing translations (i18n)

UI strings and node titles live in `i18n.js`, in two objects:

- `UI_STRINGS` — header text, legend copy, the note box, degree labels
- `NODE_TITLES` — the translated name of each order, keyed by the same `id`
  used in `index.html`

To add a new language:

1. Add an entry to the `LANGUAGES` array (`code`, `label`, and a `flag` emoji).
2. Add a matching language key to both `UI_STRINGS` and `NODE_TITLES`, with
   every key from the existing `en` block translated.
3. Test all three states: initial load, switching to your language, and
   switching away and back — the diagram re-fits itself on every switch, so
   check that nothing overflows or overlaps with your translated text (longer
   strings are the most common source of layout issues here).

To correct an existing translation, just edit the relevant string(s) in
`UI_STRINGS` or `NODE_TITLES` and explain the correction in your PR
description.

## Submitting changes

1. Fork the repository and create a branch from `main`.
2. Make your change and verify it visually in a browser at a few different
   window sizes (the diagram is meant to scale to fit any viewport).
3. Open a pull request using the PR template — describe what changed and why,
   and include a screenshot or GIF for any visual change.

## Code style

- No build tooling, no dependencies — keep it plain HTML/CSS/vanilla JS.
- Match the existing formatting (2-space indentation, double quotes in JS).
- Prefer small, focused PRs over large ones that mix unrelated changes.
