# Anni Fitness

Multi-page website for Anni Fitness, a strength and conditioning club, built with React. Poster layout inspired by a bold bar site: color stripes, a floating menu instead of a link bar, diagonal marquees, and moving gym graphics (barbell, dumbbell, kettlebell, plate, rope, med ball) plus interactive Three.js pieces — a barbell you can load, a three-ring mark, and a kettlebell you can swing.

Front end only. There is no server or database; the contact form validates in the browser and keeps nothing.

## Stack

- React 19 with Vite
- React Router (hash routes, so it works on static hosting such as GitHub Pages without redirects)
- Three.js for the 3D scenes
- Plain CSS in `src/styles.css`

## Pages

Home, About, Programs, Exercises, Trainers, Membership, Schedule, Contact.

## Exercise library

The Exercises pages use the free [ExerciseDB](https://oss.exercisedb.dev/docs) dataset from AscendAPI. Each exercise has a full-movement GIF (the whole rep, looping), target muscles, equipment, and step-by-step instructions. The catalog in `src/data/exercisedb.json` keeps the exercises whose clips are actually online. The clips load from ExerciseDB’s CDN. That free dataset is GIF only (no MP4 files) and is for non-commercial use; the pages credit AscendAPI.

- `/#/exercises` — browse by muscle group (chest, back, shoulders, arms, legs, core, cardio), filter by equipment, search by name or muscle. Filters live in the URL, so a view can be linked to, e.g. `/#/exercises?group=chest&equipment=barbell`.
- `/#/exercises/:id` — one exercise: the full movement clip, muscles, facts, numbered instructions, and related lifts.

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
src/components/         Header, Footer, Scene, Stat, TiltCard, CtaBand, Logo, Marks, ExerciseCard
src/data/exercises.js   ExerciseDB loader, muscle groups
src/data/exercisedb.json  1,500 exercises and full-movement clip URLs
src/three/createScene.js  Three.js scenes (barbell, mark, kettlebell)
src/hooks.js            Title, reveal-on-scroll, count-up
src/styles.css          All styling
public/favicon.svg
```

## Before you publish

Address, hours, prices, class times, and coach names are starter content. Replace them, including `hello@annifitness.example`. Connect the contact form to a form service or your own endpoint when you are ready to receive messages.
