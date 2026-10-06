# 💱 Currency Converter

Converts between more than 150 currencies using live exchange rates from a public API.

**Tech:** React 19 · Vite · Tailwind CSS v4 · [fawazahmed0 Currency API](https://github.com/fawazahmed0/exchange-api)

## Features
- Live exchange rates fetched for the selected base currency
- Dropdowns listing every currency the API supports
- **Swap** button that flips the From and To currencies
- Glassmorphism card design
- Defaults to **USD → NPR**

## Concepts Practised
- **A custom hook** (`useCurrencyInfo`) that fetches rates whenever the base currency changes
- **A reusable component** (`InputBox`) configured through props
- `useId` for accessible label–input pairs
- Lifting state up and passing callbacks to child components
- Exporting components from a single `components/index.js` file

## Run Locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints, usually http://localhost:5173.

## Files
```
src/
├── App.jsx                   # Conversion state, swap logic and layout
├── components/
│   ├── InputBox.jsx          # Reusable amount + currency selector
│   └── index.js              # Exports all components
└── hooks/
    └── useCurrencyInfo.js    # Fetches exchange rates
```
