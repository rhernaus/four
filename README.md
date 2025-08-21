# Everything is FOUR

A fun web app demonstrating the "four is cosmic" theory in multiple languages.
Every word eventually leads to four when you count its letters and repeat.

## How It Works

1. Start with any word
2. Count the number of letters in the word
3. Write out that number as a word
4. Repeat steps 2-3 until you reach "four"

Example: `programming` → `eleven` → `six` → `three` → `five` → `four` → `four`

## Features

- Works in multiple languages (English, Dutch, German)
- Dark mode support
- Share functionality
- Word suggestions
- Clean URL structure (example.com/nl/woord)

## Technologies

- Vanilla JavaScript
- CSS
- Static hosting (GitHub Pages, Vercel)

## Development

This is a static site. You can open `index.html` directly or serve it with any
static server:

```bash
npx serve .
```

SPA-style routing is supported via `404.html` (GitHub Pages) and `vercel.json`
(Vercel). The app detects and respects subpath deployments.

## Languages

The app works in languages where the word for "four" has exactly 4 letters:

- English: "four" = 4 letters
- Dutch: "vier" = 4 letters
- German: "vier" = 4 letters
