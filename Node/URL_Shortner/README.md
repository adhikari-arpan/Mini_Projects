# 🔗 URL Shortener

A full-stack URL shortener. Paste a long link to get a short ID, use the short link to be redirected, and see how many times each link has been clicked.

**Tech:** Node.js · Express 5 · MongoDB · Mongoose · EJS · shortid

## Features
- Turns any URL into a short ID (`/url/:shortId`)
- Redirects short links to the original URL
- Logs a timestamp for every visit
- Dashboard listing every short link, its target and its click count
- Server-side rendered with EJS

## Concepts Practised
- Setting up an Express server with separate routers (`routes/url.js`, `routes/staticRouter.js`)
- MVC-style folders: models, routes, views
- Mongoose schemas with `timestamps`, nested arrays and `findOneAndUpdate` with `$push`
- Server-side rendering with EJS templates
- Parsing JSON and form data with Express middleware

## API
| Method | Route                     | Description                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/`                       | Dashboard: form + table of all links |
| POST   | `/url`                    | Create a short URL (form field `url`) |
| GET    | `/url/:shortId`           | Redirect to the original URL         |
| GET    | `/url/analytics/:shortId` | Click count and visit history        |

## Run Locally
**Requires:** Node.js 18+ and MongoDB running on `mongodb://127.0.0.1:27017`.
```bash
npm install
npm start          # runs nodemon index.js
```
Then open http://localhost:8001.

## Files
```
URL_Shortner/
├── index.js              # App entry, middleware, redirect route
├── connect.js            # MongoDB connection helper
├── controllers/url.js    # Create short URL + analytics handlers
├── models/url.js         # Mongoose URL schema
├── routes/
│   ├── url.js            # /url routes (create, analytics)
│   └── staticRouter.js   # Renders the dashboard
└── views/home.ejs        # Dashboard template
```
