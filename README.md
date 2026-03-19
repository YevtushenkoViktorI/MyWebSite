# myPortfolioSite

## Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

- Use **GitHub Actions** as Pages source.
- This repo is configured for project path deployment via `.env.production`:
  - `VITE_BASE_PATH=/MyWebSite/`
- Do not publish raw `main` source as static site root; publish built `dist` artifact (workflow already does this).

## Fonts

`src/styles/localFonts.css` now uses local/system font fallback for `Sora` and `Manrope`, so missing `/fonts/*.woff2` requests are avoided.

## Structure

- `src/styles/colorPalette.css` - one file with all colors
- `src/styles/localFonts.css` - local font setup
- `src/i18n/locales/` - separate localization files per language
