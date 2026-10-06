# 🔐 Password Generator

Generates a random password from the options you choose and copies it to your clipboard with one click.

**Tech:** React 19 · Vite · Tailwind CSS v4

## Features
- Length slider from 6 to 100 characters
- Optional numbers and special characters
- A new password is generated whenever an option changes
- **Copy** button selects the password and copies it to the clipboard

## Concepts Practised
- `useState` for the options
- `useCallback` to memoise the generator and copy functions
- `useEffect` to regenerate the password when the options change
- `useRef` to select the text in the input
- The Clipboard API (`navigator.clipboard.writeText`)

## Run Locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints, usually http://localhost:5173.

## Files
```
src/
├── App.jsx     # Generator logic, options and UI
├── main.jsx    # React entry point
└── index.css   # Tailwind import
```
