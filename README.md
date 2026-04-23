# ⏳ Time Traveler's Web

> **Surf the Web Before It Was Cool.**

An interactive single-page application that transports you to different eras of internet history. Select a year — 1985, 1991, 1996, 2000, or 2005 — and watch the entire website transform to reflect the look, feel, and digital culture of that time.

From green-screen terminals and ASCII art to GeoCities sparkle, dot-com pop-ups, and MySpace glitter — experience how the internet looked and felt at every stage of its evolution.

---

## Table of Contents

- [Why This Exists](#why-this-exists)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [CI Pipeline](#ci-pipeline)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Author](#author)

---

## Why This Exists

The internet's visual history is vanishing. Geocities pages, early HTML experiments, and MySpace profiles are mostly gone. This project preserves that experience as a playful, educational tool — letting you *feel* what it was like to browse the web in each era, not just read about it.

It's also a showcase of modern frontend techniques (React, TypeScript, Tailwind CSS) used to faithfully recreate *intentionally outdated* designs.

---

## Features

### 🕹️ Era-Specific Themes

Each year brings a complete visual and interactive transformation:

| Year | Theme | Highlights |
|------|-------|------------|
| **1985** | Terminal Green | CRT scanlines, ASCII art, boot-up sequence, blinking cursor |
| **1991** | Early HTML | Serif fonts, blue links, "Best Viewed With..." badges |
| **1996** | GeoCities Sparkle | Marquees, tiled backgrounds, hit counters, guestbook, sparkly text |
| **2000** | Dot-Com Boom | Pop-up ads, skeuomorphic buttons, e-commerce aesthetic |
| **2005** | MySpace Era | Glitter text, custom cursors, profile customization, embedded media player |

### 🧩 Interactive Elements

- **Guestbook** — Sign a retro guestbook (entries persist per era in localStorage)
- **HTML Tutorial** — Basic tag guide for the 1991 era
- **Simulated Flash Demos** — Visual placeholders for the Flash era
- **"Under Construction" Signs** — Authentic animated GIFs
- **ASCII Art Viewer** — Clickable ASCII art (1985)
- **MySpace Profile Editor** — Customize background, text, and accent colors (2005)

### 🎭 Immersive Transitions

Era changes trigger visual effects — static, glitch, or fade — that match the destination era. All animations respect the **Reduce Motion** toggle and `prefers-reduced-motion`.

### 🥚 Easter Eggs

Hidden interactions in specific eras:
- **2000** — Matrix digital rain effect
- **1996** — Simulated Rickroll
- Other eras have themed text surprises

### ♿ Accessibility

- **Reduce Motion Toggle** in the footer (also respects OS-level preference)
- ARIA attributes on all interactive elements
- Keyboard-navigable overlays with focus trapping

### 💾 State Persistence

All user choices are saved to `localStorage`:
- Last selected year
- Guestbook entries (per era)
- MySpace profile color customizations
- Reduce motion preference

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Component-based UI with hooks |
| **TypeScript** | Type-safe application logic |
| **Tailwind CSS** (CDN) | Utility-first styling |
| **Custom CSS** | Era-specific animations (CRT, glitch, marquee, sparkle, glitter) |
| **Vite** | Fast dev server and production bundler |
| **Google Fonts** | Era-authentic typography (VT323, Press Start 2P, Comic Neue) |
| **GitHub Actions** | CI pipeline for lint and build |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18+**
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/dhaatrik/time-travelers-web.git
cd time-travelers-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## Usage

1. **Select a year** from the "Travel to:" dropdown in the header.
2. **Explore the era** — read the news headlines, click the retro ads, sign the guestbook.
3. **Find easter eggs** — look for subtle, clickable symbols scattered across each era.
4. **Customize your profile** — in the 2005 (MySpace) era, use the color pickers to personalize your profile section.
5. **Toggle Reduce Motion** — use the footer button to disable animations if preferred.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type-checking (`tsc --noEmit`) |

---

## Project Structure

```
time-travelers-web/
├── .github/workflows/   # CI pipeline (GitHub Actions)
│   └── ci.yml
├── components/          # React components
│   ├── AboutOverlay.tsx
│   ├── EraContentRenderer.tsx
│   ├── MarqueeText.tsx
│   ├── MatrixEffectOverlay.tsx
│   ├── Popup.tsx
│   ├── RickrollOverlay.tsx
│   ├── TransitionOverlay.tsx
│   └── YearSelector.tsx
├── App.tsx              # Root application component
├── constants.ts         # Era data, themes, and static content
├── types.ts             # TypeScript type definitions
├── index.tsx            # React entry point
├── index.html           # HTML shell with custom CSS animations
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json
├── CONTRIBUTING.md
├── LICENSE              # MIT License
└── .gitignore
```

---

## CI Pipeline

Every push and pull request to `main` triggers a [GitHub Actions](https://github.com/dhaatrik/time-travelers-web/actions) workflow that:

1. **Lints** — runs `tsc --noEmit` to catch type errors
2. **Builds** — runs `vite build` to verify the production bundle

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) before submitting a pull request.

**Quick start:**

```bash
git checkout -b feature/your-feature
# Make changes, then:
npm run lint
npm run build
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

---

## Roadmap

- [ ] More interactive mini-apps (text adventure for 1985, mock Winamp player)
- [ ] Deeper WCAG accessibility (animated GIF control, high-contrast mode)
- [ ] Additional eras (2010 — early mobile web? 2015 — flat design?)
- [ ] Expand user customization to other eras

---

## License

This project is released under the [MIT License](./LICENSE).

---

## Author

**Dhaatrik Chowdhury** — [GitHub](https://github.com/dhaatrik)

---

<p align="center"><em>Enjoy your trip through the digital past!</em></p>