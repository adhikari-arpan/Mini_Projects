# 🧭 React Router Project

A multi-page layout built with React Router: a shared header and footer, with each page rendered between them.

**Tech:** React 19 · Vite · Tailwind CSS v4 · React Router v7

## Features
- A shared `Layout` component that renders each page through `<Outlet />`
- Four pages: Home, About, Contact (form) and GitHub (live profile data from the GitHub API)
- Navigation links that highlight the active page with `NavLink`
- Responsive header, footer and landing page

## Concepts Practised
- `createBrowserRouter` + `createRoutesFromElements`
- Nested routes and layout routes
- `Link` vs `NavLink` (styling the active link with `isActive`)
- Fetching API data with `useEffect` and showing loading/error states
- Organising components in their own folders

## Run Locally
```bash
npm install
npm run dev
```
Then open the URL Vite prints, usually http://localhost:5173.

## Files
```
src/
├── main.jsx              # Router configuration
├── Layout.jsx            # Header + Outlet + Footer
└── components/
    ├── Header/Header.jsx
    ├── Footer/Footer.jsx
    ├── Home/Home.jsx
    ├── About/About.jsx
    ├── Contact/Contact.jsx
    └── Github/Github.jsx   # Fetches GitHub profile
```

## Acknowledgements
Built while following the *Chai aur React* series by Hitesh Choudhary.
