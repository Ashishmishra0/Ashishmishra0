# Anni Fitness

Multi-page website for Anni Fitness, a strength and conditioning club, built with React. Dark athletic layout, poster type, and interactive 3D pieces rendered with Three.js: a barbell you can load, a three-ring mark, and a kettlebell you can swing.

Front end only. There is no server or database; the contact form validates in the browser and keeps nothing.

## Stack

- React 19 with Vite
- React Router (hash routes, so it works on static hosting such as GitHub Pages without redirects)
- Three.js for the 3D scenes
- Plain CSS in `src/styles.css`

## Pages

Home, About, Programs, Exercises, Trainers, Membership, Schedule, Contact.

## Exercise library

The Exercises pages pull from [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), an open public-domain dataset (Unlicense) of 870+ exercises with start/finish photos, target muscles, equipment, level, and step-by-step instructions. The JSON and images are loaded at runtime from the jsDelivr CDN (`src/data/exercises.js`), so there is nothing to host or key to manage.

- `/#/exercises` — browse by muscle group (chest, back, shoulders, arms, legs, core), filter by equipment and level, search by name or muscle. Filters live in the URL, so a view can be linked to, e.g. `/#/exercises?group=chest&equipment=barbell`.
- `/#/exercises/:id` — one exercise: animated start/finish photos, muscles, facts, numbered instructions, and related lifts.

If you would rather not depend on the CDN, copy `dist/exercises.json` and the `exercises/` image folders from that repo into `public/` and point `BASE` in `src/data/exercises.js` at them.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

The static output lands in `dist/`. Upload that folder to any static host, or point GitHub Pages at it.

## Layout

```
index.html              Vite entry
src/main.jsx            Mounts the app
src/App.jsx             Routes, header, footer
src/pages/              One component per page
src/components/         Header, Footer, Scene, Stat, TiltCard, CtaBand, Logo, ExerciseCard
src/data/exercises.js   Free Exercise DB loader, muscle groups, image URLs
src/three/createScene.js  Three.js scenes (barbell, mark, kettlebell)
src/hooks.js            Title, reveal-on-scroll, count-up
src/styles.css          All styling
public/favicon.svg
```

## Before you publish

Address, hours, prices, class times, and coach names are starter content. Replace them, including `hello@annifitness.example`. Connect the contact form to a form service or your own endpoint when you are ready to receive messages.
