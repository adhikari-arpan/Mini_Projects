#!/usr/bin/env node
// Builds projects.json from the folder structure, so adding a project is just:
//   1. create  <Category>/<Project_Folder>/  with a README.md
//   2. push
// A GitHub Action (.github/workflows/manifest.yml) runs this on every push and
// commits the result. Run it locally with:  node scripts/generate-manifest.mjs
//
// Rules
//   - Every top-level folder is a category; every folder inside it is a project.
//   - New folders get auto-generated entries marked "generated": true, which are
//     rebuilt on every run so README edits flow through. Entries without that
//     flag are hand-written and kept exactly as they are — to hand-edit an
//     auto entry, edit it in projects.json and delete its "generated" line.
//     Deleted folders drop out.
//   - Optional per-project overrides: <project>/project.json, e.g.
//       { "demoUrl": "https://…", "image": "screenshot.png", "hidden": true }
//     Fields there always win, and "hidden": true leaves the project out.
//
// Auto-generated fields for a new project
//   title       README's first "# Heading" (emoji stripped), else the folder name
//   description first paragraph of the README
//   tech        README "**Tech:** a · b · c" line, else detected from package.json,
//               Python imports / requirements.txt, or html/css/js files
//   concepts    bullets under a README heading containing "Concept"
//   type        vite | server | static | cli | other   (from the files present)
//   image       screenshot.* / preview.* in the folder, if any

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = path.join(ROOT, 'projects.json');
const REPO_URL = 'https://github.com/adhikari-arpan/Mini_Projects';
const IGNORED_DIRS = new Set(['node_modules', 'scripts', 'dist', 'build', '__pycache__', 'venv', '.venv']);

// Known category folders → ids/labels the portfolio already styles.
const KNOWN_CATEGORIES = {
  javascript: { id: 'javascript', label: 'Vanilla JavaScript' },
  react: { id: 'react', label: 'React' },
  node: { id: 'node', label: 'Node.js' },
  python: { id: 'python', label: 'Python' },
};

// ── helpers ──────────────────────────────────────────────────────────────
const readText = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
const readJson = (p) => {
  const t = readText(p);
  if (t === null) return null;
  try {
    return JSON.parse(t);
  } catch {
    console.warn(`⚠ Ignoring invalid JSON: ${path.relative(ROOT, p)}`);
    return null;
  }
};
const subdirs = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !IGNORED_DIRS.has(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b));
const listFiles = (dir, depth = 2) => {
  const out = [];
  const walk = (d, level) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || IGNORED_DIRS.has(e.name)) continue;
      const full = path.join(d, e.name);
      if (e.isDirectory()) { if (level < depth) walk(full, level + 1); } else out.push(full);
    }
  };
  walk(dir, 0);
  return out;
};
const slugify = (s) =>
  s.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const humanize = (s) =>
  s.replace(/[_-]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\s+/g, ' ').trim()
    .replace(/^./, (c) => c.toUpperCase());
const stripMd = (s) =>
  s.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const uniq = (arr) => [...new Set(arr.filter(Boolean))];

// ── README parsing ───────────────────────────────────────────────────────
// Turns one "Concepts Practised" bullet into a short tag. Best results come
// from writing the key phrase in **bold** in the README; otherwise it uses a
// "Topic: explanation" lead-in, or the start of the sentence up to a natural
// break ("with", "into", "to", …).
const BREAK_WORDS = /^(with|into|to|by|using|from|for|via|through|and|so|that|when|in|on|as|which)$/i;
function conceptLabel(item) {
  // Capitalise plain words only — never identifiers like json.loads or useState.
  const tidy = (s) => {
    const t = stripMd(s).replace(/^(a|an|the)\s+/i, '').replace(/[,.;:]+$/, '').trim();
    return /^[a-z]+(\s|$)/.test(t) ? t.replace(/^./, (c) => c.toUpperCase()) : t;
  };
  const bold = item.match(/\*\*([^*]+)\*\*/);
  if (bold) return tidy(bold[1]);
  const text = stripMd(item);
  const lead = text.split(/:\s|\s[—–]\s|\s-\s/)[0];
  if (lead !== text && lead.split(' ').length <= 5) return tidy(lead);
  const words = [];
  for (const w of text.split(' ')) {
    if (words.length >= 2 && BREAK_WORDS.test(w)) break;
    words.push(w);
    if (words.length >= 5) break;
  }
  return tidy(words.join(' '));
}

function parseReadme(md) {
  if (!md) return {};
  const lines = md.split(/\r?\n/);
  const h1 = lines.find((l) => /^#\s+/.test(l));
  const title = h1 ? stripMd(h1.replace(/^#\s+/, '')).replace(/^[^\p{L}\p{N}]+/u, '').trim() : null;

  // First real paragraph after the title (skip images/badges/headings).
  let description = null;
  const start = h1 ? lines.indexOf(h1) + 1 : 0;
  const para = [];
  for (let i = start; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) { if (para.length) break; continue; }
    if (/^(#|!\[|\[!\[|```|\*\*Tech|[-*] |\||>)/.test(l)) { if (para.length) break; continue; }
    para.push(l);
  }
  if (para.length) {
    description = stripMd(para.join(' '));
    if (description.length > 200) {
      const cut = description.slice(0, 200);
      description = (cut.lastIndexOf('. ') > 80 ? cut.slice(0, cut.lastIndexOf('. ') + 1) : `${cut.trimEnd()}…`);
    }
  }

  // "**Tech:** React 19 · Vite · Tailwind CSS v4"
  let tech = null;
  const techLine = lines.find((l) => /^\*\*Tech:?\*\*/i.test(l.trim()));
  if (techLine) {
    tech = uniq(
      stripMd(techLine.replace(/^\s*\*\*Tech:?\*\*:?/i, ''))
        .split(/\s*[·,|]\s*/)
        .map((t) => t.replace(/\([^)]*\)/g, '').replace(/\s+v?\d+(\.\d+)*\+?$/i, '').trim()),
    );
  }

  // Bullets under a "Concepts" heading → short labels (max 4).
  const concepts = [];
  const ci = lines.findIndex((l) => /^#{2,4}\s.*concept/i.test(l));
  if (ci !== -1) {
    for (let i = ci + 1; i < lines.length && concepts.length < 4; i++) {
      const l = lines[i].trim();
      if (/^#/.test(l)) break;
      const m = l.match(/^[-*]\s+(.*)$/);
      if (m) concepts.push(conceptLabel(m[1]));
    }
  }

  return { title, description, tech, concepts };
}

// ── tech / type detection ────────────────────────────────────────────────
const NPM_TECH = [
  ['react', 'React'], ['vite', 'Vite'], ['tailwindcss', 'Tailwind CSS'], ['@tailwindcss/vite', 'Tailwind CSS'],
  ['react-router', 'React Router'], ['react-router-dom', 'React Router'], ['express', 'Express'],
  ['mongoose', 'MongoDB'], ['mongodb', 'MongoDB'], ['mongoose', 'Mongoose'], ['ejs', 'EJS'],
  ['axios', 'Axios'], ['socket.io', 'Socket.IO'], ['ollama', 'Ollama'], ['openai', 'OpenAI API'],
  ['typescript', 'TypeScript'], ['next', 'Next.js'],
];
const PY_TECH = {
  ollama: 'Ollama', requests: 'Requests', flask: 'Flask', fastapi: 'FastAPI', streamlit: 'Streamlit',
  tkinter: 'Tkinter', pandas: 'pandas', numpy: 'NumPy', sklearn: 'scikit-learn', langchain: 'LangChain',
  openai: 'OpenAI API', pygame: 'Pygame', matplotlib: 'Matplotlib', torch: 'PyTorch',
};

function detect(dir) {
  const files = listFiles(dir);
  const ext = (e) => files.some((f) => f.toLowerCase().endsWith(e));
  const pkg = readJson(path.join(dir, 'package.json'));
  const tech = [];
  let type = 'other';

  if (pkg) {
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const isVite = 'vite' in deps;
    const isServer = ['express', 'koa', 'fastify', 'mongoose'].some((d) => d in deps);
    if (!isVite) tech.push('Node.js');
    for (const [dep, name] of NPM_TECH) if (dep in deps) tech.push(name);
    type = isVite ? 'vite' : isServer ? 'server' : 'cli';
  } else if (ext('.py')) {
    tech.push('Python');
    const src = files.filter((f) => f.endsWith('.py')).map((f) => readText(f)).join('\n')
      + `\n${readText(path.join(dir, 'requirements.txt')) || ''}`;
    for (const [mod, name] of Object.entries(PY_TECH)) {
      if (new RegExp(`^\\s*(import|from)\\s+${mod}\\b|^${mod}\\b`, 'm').test(src)) tech.push(name);
    }
    type = /^\s*(import|from)\s+(flask|fastapi|streamlit)\b/m.test(src) ? 'server' : 'cli';
  } else if (ext('.html')) {
    tech.push('HTML');
    if (ext('.css')) tech.push('CSS');
    if (ext('.js')) tech.push('JavaScript');
    type = 'static';
  }

  const imageFile = files
    .map((f) => path.relative(dir, f).replace(/\\/g, '/'))
    .find((f) => /^(screenshot|preview|demo)\.(png|jpe?g|gif|webp)$/i.test(f));

  return { tech: uniq(tech), type, image: imageFile || undefined };
}

// ── build ────────────────────────────────────────────────────────────────
const existing = readJson(MANIFEST) || {};
const existingByPath = new Map((existing.projects || []).map((p) => [p.path, p]));
const existingCats = new Map((existing.categories || []).map((c) => [c.path, c]));
const usedIds = new Set((existing.projects || []).map((p) => p.id));

const categories = [];
const projects = [];
const added = [];

for (const catDir of subdirs(ROOT)) {
  const projectDirs = subdirs(path.join(ROOT, catDir));
  if (!projectDirs.length) continue;

  const known = KNOWN_CATEGORIES[catDir.toLowerCase()];
  const catReadme = parseReadme(readText(path.join(ROOT, catDir, 'README.md')));
  const category = existingCats.get(catDir) || {
    id: known?.id || slugify(catDir),
    label: known?.label || catReadme.title || humanize(catDir),
    path: catDir,
  };

  const catProjects = [];
  for (const projDir of projectDirs) {
    const relPath = `${catDir}/${projDir}`;
    const abs = path.join(ROOT, catDir, projDir);
    const override = readJson(path.join(abs, 'project.json')) || {};
    if (override.hidden) continue;

    let entry = existingByPath.get(relPath);
    // Hand-written entries (no "generated" flag) are kept exactly as they
    // are. Auto-generated ones are rebuilt every run so README edits show up.
    if (!entry || entry.generated) {
      const readme = parseReadme(readText(path.join(abs, 'README.md')));
      const found = detect(abs);
      let id = entry?.id;
      if (!id) {
        id = slugify(projDir);
        for (let n = 2; usedIds.has(id); n++) id = `${slugify(projDir)}-${n}`;
        usedIds.add(id);
      }
      if (!existingByPath.has(relPath)) added.push(relPath);
      entry = {
        id,
        title: readme.title || humanize(projDir),
        category: category.id,
        description: readme.description || '',
        tech: readme.tech?.length ? readme.tech : found.tech,
        concepts: readme.concepts || [],
        path: relPath,
        type: found.type,
        status: 'complete',
        demoUrl: null,
        ...(found.image ? { image: found.image } : {}),
        generated: true,
      };
    }

    const { hidden: _hidden, ...overrideFields } = override;
    catProjects.push({ ...entry, ...overrideFields, category: category.id, path: relPath });
  }

  if (catProjects.length) {
    categories.push(category);
    projects.push(...catProjects);
  }
}

// Keep the existing category order; new categories go after, alphabetically.
const catOrder = (existing.categories || []).map((c) => c.path);
categories.sort((a, b) => {
  const ia = catOrder.indexOf(a.path);
  const ib = catOrder.indexOf(b.path);
  return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib) || a.path.localeCompare(b.path);
});
// Within a category: existing entries keep their order, new ones follow.
const prevOrder = (existing.projects || []).map((p) => p.path);
const rank = (p) => (prevOrder.indexOf(p.path) === -1 ? Infinity : prevOrder.indexOf(p.path));
projects.sort((a, b) =>
  categories.findIndex((c) => c.id === a.category) - categories.findIndex((c) => c.id === b.category)
  || rank(a) - rank(b)
  || a.path.localeCompare(b.path));

const removed = [...existingByPath.keys()].filter((p) => !projects.some((x) => x.path === p));

const manifest = {
  title: existing.title || 'Mini Projects',
  summary: existing.summary || 'Small projects built while learning',
  repoUrl: REPO_URL,
  categories,
  projects,
};

// Same compact style as the hand-written file: string arrays and small
// objects (categories) on one line, so diffs stay readable.
const compact = (json) =>
  json
    .replace(/\[\s+([^[\]{}]*?)\s+\]/g, (_, inner) => `[${inner.replace(/\s*\n\s*/g, ' ')}]`)
    .replace(/\{\s+([^[\]{}]*?)\s+\}/g, (_, inner) => `{ ${inner.replace(/\s*\n\s*/g, ' ')} }`);
const next = `${compact(JSON.stringify(manifest, null, 2))}\n`;
if (next === readText(MANIFEST)) {
  console.log(`projects.json is up to date (${projects.length} projects).`);
} else {
  fs.writeFileSync(MANIFEST, next);
  console.log(`projects.json updated: ${projects.length} projects in ${categories.length} categories.`);
  if (added.length) console.log(`  + added: ${added.join(', ')}`);
  if (removed.length) console.log(`  - removed: ${removed.join(', ')}`);
}
