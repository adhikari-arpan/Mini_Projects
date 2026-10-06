# Mini Projects

A collection of small projects I built while learning programming and web development. Each one practises a specific concept, and new projects are added as I learn.

## How It's Organised
Projects are grouped by language or tool. Each top-level folder is a category, and each folder inside it is one project:

```
Mini_Projects/
├── <Category>/
│   └── <Project>/
│       └── README.md    # What it does, concepts practised, how to run it
├── scripts/
│   └── generate-manifest.mjs   # Builds projects.json
└── projects.json        # Machine-readable list of all projects (used by my portfolio)
```

Every project has its own README with features, concepts practised and setup steps. Browse the folders to see what's currently here.

## Adding a project
1. Create a folder inside a category, e.g. `Python/My_New_Project/` (a new top-level folder such as `AI/` becomes a new category).
2. Add a `README.md` that starts with `# Title`, then a one-paragraph description. Optionally add a `**Tech:** A · B · C` line and a `## Concepts Practised` list.
3. Push. A GitHub Action regenerates `projects.json`, and the project appears on my portfolio automatically.

Optional `project.json` inside a project folder overrides any field, e.g. `{ "demoUrl": "https://…", "image": "screenshot.png" }`, or `{ "hidden": true }` to leave it out. Run `node scripts/generate-manifest.mjs` to preview the result locally.

---
Made by [Arpan Adhikari](https://www.arpanadhikari7.com.np)
