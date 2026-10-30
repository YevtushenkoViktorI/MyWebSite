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

## Cloudflare Pages

The production site is built for `https://viktoryevtushenko.com/` and deployed
from the private GitHub repository through Cloudflare Pages Git integration.

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root
- Production base path: `/`

Cloudflare Pages rebuilds and deploys the site after each push to `main`.

## Fonts

`src/styles/localFonts.css` now uses local/system font fallback for `Sora` and `Manrope`, so missing `/fonts/*.woff2` requests are avoided.

## Structure

- `src/styles/colorPalette.css` - one file with all colors
- `src/styles/localFonts.css` - local font setup
- `src/i18n/locales/` - separate localization files per language
