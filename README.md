# Masonic Orders & Paths of Initiation

**Interactive Masonic Orders Hierarchy & Paths of Initiation Diagram**

## Overview

This project is an interactive visual diagram mapping the progression, prerequisites, and appendant bodies of Freemasonry — from Craft Freemasonry through the appendant and chivalric orders open to Master Masons. It is rendered entirely with HTML, CSS, hand-drawn SVG connectors, and vanilla JavaScript, with no build step or framework dependency.

Each order is shown as a real emblem/badge, connected by curved lines to the order(s) it requires. Clicking any order traces its full chain of prerequisites, and hovering reveals its emblem in full color.

## Features

- **Multilingual support** — English, Português (BR), and Français, switchable via flag buttons in the header, with the choice persisted per visitor.
- **Faith requirement indicators** — orange rings mark orders that admit all faiths; green rings mark orders open only to Trinitarian Christians.
- **Dynamic SVG path calculations** — connector lines between prerequisite nodes are computed live from each emblem's on-screen position, so they stay correctly aligned across every language, screen size, and window resize.
- **Responsive and lightweight** — a single composition that scales to fit any viewport (desktop or mobile) like a poster, with no separate mobile layout to maintain. Fully static, ready for GitHub Pages hosting with zero configuration.

## Project Structure

```
.
├── index.html        Page markup — the diagram's node/tier structure
├── styles.css         All visual styling (theme, layout, responsive scaling)
├── app.js             Connector rendering, click-to-trace, i18n application, fit-to-viewport logic
├── i18n.js            Translation dictionary (UI strings + node titles) for en / pt-BR / fr
└── assets/
    └── logos/         Emblem images for each order
```

## Deploying to GitHub Pages

1. Push this repository to GitHub with the site files on the `main` branch.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose the **`main`** branch and the **`/ (root)`** folder, then save.
5. GitHub will publish the site at `https://<your-username>.github.io/<repository-name>/`.

All asset and script references in this project use relative paths (e.g. `assets/logos/...`), so the site works correctly whether it's served from a domain root or a GitHub Pages project subpath — no configuration changes are needed.

## Reference

The hierarchy and prerequisite structure follow common English/Irish constitutional practice. Individual jurisdictions and Grand Lodges vary, so this diagram is intended for educational and reference purposes rather than as an authoritative statement of any single constitution's requirements.
