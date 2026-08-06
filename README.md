# GiveFive
Micro-volunteering, one swipe at a time.

GiveFive turns volunteering into 5-minute tasks instead of hour-long commitments — proofread a paragraph, explain a confusing form, do a quick practice interview, or just keep someone company on a call. Swipe right to commit, swipe left to pass.


## Features
- Swipeable task deck (drag or tap buttons)
- Filter tasks by category
- Undo your last swipe
- Track commitments and mark them done
- Impact dashboard — minutes given, people helped, streak, badges
- Installable as a home-screen app (PWA)

## Tech stack
React + Vite, [lucide-react](https://lucide.dev) for icons. No backend — all state is in-memory for this MVP.

## Getting started
Requires [Node.js](https://nodejs.org) v18+ installed.

```bash
# 1. clone the repository
git clone https://github.com/akaneme/GiveFive.git

# 2. move into the project folder
cd GiveFive

# 3. install dependencies
npm install

# 4. start the dev server
npm run dev
```

Open the URL it prints in your terminal (usually `http://localhost:5173`) in your browser.

To build a production version instead:

```bash
npm run build
npm run preview
```

## Install as an app
On a phone, open the running site and:
- **Android/Chrome:** menu (⋮) → "Add to Home Screen" / "Install app"
- **iPhone/Safari:** Share icon → "Add to Home Screen"

It'll launch full-screen with its own icon, no browser bar.

## File structure
```
givefive/
├── demo/
│   ├── discover-screen.png
│   ├── commitments-tab.png
│   ├── impact-dashboard.png
│   └── recording.mp4
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.json
│   ├── sw.js
│   └── icon files
└── src/
    ├── main.jsx
    └── App.jsx
```

## Demo
Watch the mini demo recording

https://github.com/user-attachments/assets/6b1dd6f8-2ebe-4de7-986a-10ad4d24c7a6

