# Contributing to Time Traveler's Web

Thanks for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (included with Node.js)

### Setup

1. **Fork** this repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/time-travelers-web.git
   cd time-travelers-web
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Development Workflow

1. Create a new branch for your feature or fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes — keep commits focused and descriptive.
3. Test your changes locally by running the dev server and verifying in the browser.
4. Build the project to ensure there are no compile errors:

   ```bash
   npm run build
   ```

5. Push your branch and open a Pull Request.

## Code Style

- **TypeScript** is used throughout — avoid `any` types where possible.
- **React functional components** with hooks are the standard pattern.
- **Tailwind CSS** utility classes are used for styling alongside custom CSS in `index.html`.
- Keep components small and focused.
- Preserve all existing comments and documentation unless your change directly affects them.

## Adding a New Era

To add a new historical era:

1. Add the year to the `Year` type in `types.ts`.
2. Add the year to `AVAILABLE_YEARS` in `constants.ts`.
3. Define the full `EraData` object in `ERAS_DATA` within `constants.ts`, including theme, headlines, ads, memes, and cultural references.
4. Add any era-specific CSS animations to `index.html`.

## Submitting Issues

- Use the [GitHub Issues](https://github.com/dhaatrik/time-travelers-web/issues) page.
- Provide a clear title and description.
- Include steps to reproduce for bugs.
- Include screenshots if applicable.

## Submitting Pull Requests

- Reference any related issues in your PR description.
- Provide a clear description of what changed and why.
- Ensure your branch is up to date with `main` before submitting.
- Keep PRs focused — one feature or fix per PR.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
