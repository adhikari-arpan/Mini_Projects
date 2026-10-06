# Mini Projects

A collection of small projects I built while learning web development and programming. Each one practises a specific concept, from DOM manipulation in vanilla JavaScript to React hooks, routing, context and a full-stack Node.js/MongoDB app.

## Projects

### 🟨 Vanilla JavaScript — [`/Javascript`](Javascript)
| Project | Highlights |
|---------|------------|
| [Background Colour Switcher](Javascript/BGChanger_JS) | DOM events, inline styles |
| [BMI Calculator](Javascript/BMI_Calculator) | Form handling, validation |
| [World Digital Clock](Javascript/Digital_Clock) | `setInterval`, Intl time zones |
| [Number Guessing Game](Javascript/Number_Guesser) | Game state, dynamic DOM |

### ⚛️ React — [`/React`](React)
| Project | Highlights |
|---------|------------|
| [Counter](React/Counter_React) | `useState` |
| [Background Colour Changer](React/BGChanger_React) | `useState`, Tailwind |
| [Password Generator](React/Password_Generator) | `useCallback`, `useEffect`, `useRef` |
| [Currency Converter](React/currencyConverter) | Custom hook, live API |
| [React Router Project](React/Router_Project) | React Router v7 layouts |
| [Theme Switcher](React/themeSwitcher) | Context API, dark mode |

### 🟩 Node.js — [`/Node`](Node)
| Project | Highlights |
|---------|------------|
| [URL Shortener](Node/URL_Shortner) | Express, MongoDB, EJS, analytics |

### 🐍 Python — [`/Python`](Python)
| Project | Highlights |
|---------|------------|
| [CLI Calculator](Python/Calculator_in_Python) | Functions, error handling |
| [Rock Paper Scissors](Python/Rock_Paper_Scissor) | `random`, conditionals |

## Tech Stack
HTML · CSS · JavaScript · React · Vite · Tailwind CSS · React Router · Node.js · Express · MongoDB · EJS · Python

## Repository Structure
```
Mini_Projects/
├── Javascript/      # Vanilla JS browser apps (open index.html)
├── React/           # React + Vite apps (npm install && npm run dev)
├── Node/            # Express/MongoDB backend projects
├── Python/          # CLI programs
├── scripts/         # generate-manifest.mjs — builds projects.json
└── projects.json    # Machine-readable list of all projects (used by my portfolio)
```

Every project folder has its own README with features, concepts practised and setup steps.

## Adding a project
1. Create a folder inside a category, e.g. `Python/My_New_Project/` (a new top-level folder such as `AI/` becomes a new category).
2. Add a `README.md` that starts with `# Title`, then a one-paragraph description. Optionally add a `**Tech:** A · B · C` line and a `## Concepts Practised` list.
3. Push. A GitHub Action regenerates `projects.json`, and the project appears on my portfolio automatically.

Optional `project.json` inside a project folder overrides any field, e.g. `{ "demoUrl": "https://…", "image": "screenshot.png" }`, or `{ "hidden": true }` to leave it out. Run `node scripts/generate-manifest.mjs` to preview the result locally.

---
Made by [Arpan Adhikari](https://www.arpanadhikari7.com.np)
