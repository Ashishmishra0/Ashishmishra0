import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard.jsx";
import { SOURCE, groupLabel, imageUrl, titleCase, useExercises } from "../data/exercises.js";
import { reduceMotion, useTitle } from "../hooks.js";

export default function ExerciseDetail() {
  const { id } = useParams();
  const { data, error } = useExercises();
  const exercise = data?.find((item) => item.id === id);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(() => !reduceMotion());

  useTitle(exercise ? `${exercise.name} — Anni Fitness` : "Exercise — Anni Fitness");

  useEffect(() => {
    if (!playing || !exercise || exercise.images.length < 2) return undefined;
    const timer = setInterval(() => setFrame((value) => (value + 1) % 2), 1000);
    return () => clearInterval(timer);
  }, [playing, exercise]);

  useEffect(() => {
    setFrame(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const related = useMemo(() => {
    if (!data || !exercise) return [];
    const primary = exercise.primaryMuscles[0];
    return data
      .filter((item) => item.id !== exercise.id && item.primaryMuscles[0] === primary && item.equipment === exercise.equipment)
      .concat(data.filter((item) => item.id !== exercise.id && item.primaryMuscles[0] === primary && item.equipment !== exercise.equipment))
      .slice(0, 4);
  }, [data, exercise]);

  if (error) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Exercise library</p>
          <h1>Library unavailable.</h1>
          <p className="copy lede">The exercise data could not be loaded. Check your connection and try again.</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Exercise library</p>
          <h1>Loading…</h1>
        </div>
      </section>
    );
  }

  if (!exercise) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Exercise library</p>
          <h1>That lift is not on the board.</h1>
          <p className="copy lede">We could not find an exercise with that name.</p>
          <Link className="btn btn-primary" to="/exercises" style={{ marginTop: "1.2rem" }}>Back to the library</Link>
        </div>
      </section>
    );
  }

  const [start, finish] = exercise.images;
  const facts = [
    ["Level", titleCase(exercise.level)],
    ["Equipment", titleCase(exercise.equipment || "None")],
    ["Type", titleCase(exercise.category)],
    ["Movement", exercise.mechanic ? titleCase(exercise.mechanic) : "—"],
    ["Force", exercise.force ? titleCase(exercise.force) : "—"],
  ];

  return (
    <>
      <section className="page-hero ex-hero">
        <p className="watermark" aria-hidden="true">{groupLabel(exercise.group).toUpperCase()}</p>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/exercises">Library</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/exercises?group=${exercise.group}`}>{groupLabel(exercise.group)}</Link>
          </nav>
          <h1>{exercise.name}</h1>
          <p className="ex-targets">
            <span className={`pill ex-level ex-level-${exercise.level}`}>{exercise.level}</span>
            {exercise.primaryMuscles.map((muscle) => (
              <Link key={muscle} className="pill pill-muscle" to={`/exercises?q=${encodeURIComponent(muscle)}`}>{titleCase(muscle)}</Link>
            ))}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap ex-detail">
          <div className="ex-viewer">
            <div className="ex-stage">
              <img src={imageUrl(start)} alt={`${exercise.name}, starting position`} className={frame === 0 ? "is-shown" : ""} />
              {finish && <img src={imageUrl(finish)} alt={`${exercise.name}, finishing position`} className={frame === 1 ? "is-shown" : ""} />}
              <span className="ex-frame-label">{frame === 0 ? "Start" : "Finish"}</span>
            </div>
            {finish && (
              <div className="ex-controls" role="group" aria-label="Exercise photos">
                <button type="button" className={frame === 0 ? "is-active" : ""} aria-pressed={frame === 0} onClick={() => { setPlaying(false); setFrame(0); }}>
                  Start
                </button>
                <button type="button" className={frame === 1 ? "is-active" : ""} aria-pressed={frame === 1} onClick={() => { setPlaying(false); setFrame(1); }}>
                  Finish
                </button>
                <button type="button" className={playing ? "is-active" : ""} aria-pressed={playing} onClick={() => setPlaying((value) => !value)}>
                  {playing ? "Pause" : "Play"}
                </button>
              </div>
            )}
            <dl className="ex-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="ex-info">
            <div className="ex-block">
              <p className="kicker">Muscles</p>
              <p>
                <strong>Primary:</strong> {exercise.primaryMuscles.map(titleCase).join(", ")}
              </p>
              <p>
                <strong>Secondary:</strong> {exercise.secondaryMuscles.length ? exercise.secondaryMuscles.map(titleCase).join(", ") : "—"}
              </p>
            </div>
            <div className="ex-block">
              <p className="kicker">How to do it</p>
              {exercise.instructions.length ? (
                <ol className="ex-steps">
                  {exercise.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="copy">No written steps for this one yet. Ask a coach on the floor and we will walk you through it.</p>
              )}
            </div>
            <div className="ex-block ex-coach">
              <p className="kicker">At Anni</p>
              <p className="copy">
                Want this lift checked? Book an intro and a coach will set your starting load and watch the first sets.
              </p>
              <Link className="btn btn-primary" to="/contact">Book an intro</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">More for {titleCase(exercise.primaryMuscles[0])}</p>
                <h2>Same muscle. Different angle.</h2>
              </div>
              <Link className="text-link" to={`/exercises?group=${exercise.group}`}>All {groupLabel(exercise.group).toLowerCase()}</Link>
            </div>
            <div className="ex-grid">
              {related.map((item) => (
                <ExerciseCard key={item.id} exercise={item} />
              ))}
            </div>
            <p className="credit">
              Exercise data and photos from{" "}
              <a href={SOURCE.url} target="_blank" rel="noreferrer">{SOURCE.name}</a>, an open public-domain dataset.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
