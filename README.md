# GiveFive

Swipe-based micro-volunteering app. Give 5 minutes, not 5 hours.

Built for KatyYouthHacks 2026 — Tech for Humanity.

## File structure

```
givefive/
├── index.html          # HTML entry point (loads src/main.jsx)
├── package.json        # dependencies + scripts
├── vite.config.js       # Vite + React plugin config
├── .gitignore
├── README.md
└── src/
    ├── main.jsx         # React root, renders <App />
    └── App.jsx          # the whole GiveFive app (deck, tabs, state)
```

## Run it locally

You need [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`) in your browser.

To build a production version:

```bash
npm run build
npm run preview
```

## Install it like a real app (for your demo video)

The app is a PWA, so on an actual phone it can be added to the home screen and opens with no browser bar — great for filming.

- **Android (Chrome):** open the site → menu (⋮) → "Add to Home Screen" / "Install app"
- **iPhone (Safari):** open the site → Share icon → "Add to Home Screen"

On desktop browsers the app shows as a bezeled phone card so it still looks intentional; on an actual phone screen it fills the whole display edge-to-edge like a normal app.

## Push to GitHub

From inside the `givefive` folder:

```bash
git init
git add .
git commit -m "Initial commit: GiveFive MVP"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first, then swap in its URL above.)
