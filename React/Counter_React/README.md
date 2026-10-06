# ➕ Counter

A counter with Increase and Decrease buttons. It stays between 0 and 20.

**Tech:** React 19 · Vite · CSS

## Features
- Increase and decrease the value
- The value never goes below **0** or above **20**
- Each button is disabled when the counter reaches its limit

## Concepts Practised
- The `useState` hook and how React re-renders on state change
- Event handlers in JSX
- Disabling buttons based on state

## Run Locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints, usually http://localhost:5173.

## Files
```
src/
├── App.jsx     # Counter logic and UI
├── App.css     # Component styles
└── main.jsx    # React entry point
```
