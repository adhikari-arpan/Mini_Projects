# 🌗 Theme Switcher

A light/dark mode toggle that shares the current theme with every component through the React Context API.

**Tech:** React 19 · Vite · Tailwind CSS v4 (class-based dark mode)

## Features
- Toggle between light and dark themes
- The theme is stored in a Context so any component can read or change it, with no prop drilling
- Tailwind's `dark:` classes switch automatically with the theme
- A toggle switch and a demo card that both read the theme from context

## Concepts Practised
- `createContext`, `Context.Provider` and `useContext`
- Wrapping `useContext` in a custom hook (`useTheme`)
- Changing the `<html>` element's class from React

## Run Locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints, usually http://localhost:5173.

## Files
```
src/
├── App.jsx              # Theme state + provider
├── components/
│   ├── ThemeBtn.jsx     # Light/dark toggle switch
│   └── Card.jsx         # Demo card that follows the theme
└── contexts/
    └── theme.js         # ThemeContext, ThemeProvider, useTheme hook
```
