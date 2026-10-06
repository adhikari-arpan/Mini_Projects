# 🎨 Background Colour Changer (React)

The same idea as the vanilla JS colour switcher, rebuilt in React. A floating toolbar of colour buttons changes the background of the whole screen.

**Tech:** React 19 · Vite · Tailwind CSS v4

## Features
- Seven colour buttons in a pill-shaped floating toolbar
- Smooth colour transition (`duration-200`)
- Responsive: the buttons wrap on small screens

## Concepts Practised
- The `useState` hook
- Inline style binding (`style={{ backgroundColor: color }}`)
- Tailwind utility classes for layout and positioning

## Run Locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints, usually http://localhost:5173.

## Files
```
src/
├── App.jsx     # Colour state and button toolbar
├── main.jsx    # React entry point
└── index.css   # Tailwind import
```
