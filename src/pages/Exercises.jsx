import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { EQUIPMENT, GROUPS, SOURCE, titleCase, useExercises } from "../data/exercises.js";
import { useTitle } from "../hooks.js";

const PAGE = 24;

export default function Exercises() {
  useTitle("Exercise library — Anni Fitness");
  const { data, error } = useExercises();
  const [params, setParams] = useSearchParams();
  const [limit, setLimit] = useState(PAGE);

  const group = params.get("group") || "all";
  const equipment = params.get("equipment") || "all";
  const query = params.get("q") || "";
  const deferredQuery = useDeferredValue(query);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: key === "q" });
  };

  useEffect(() => {
    setLimit(PAGE);
  }, [group, equipment, deferredQuery]);

  const groupCounts = useMemo(() => {
    const counts = {};
    data?.forEach((exercise) => {
      counts[exercise.group] = (counts[exercise.group] || 0) + 1;
    });
    return counts;
  }, [data]);

  const results = useMemo(() => {
    if (!data) return [];
    const needle = deferredQuery.trim().toLowerCase();
    return data.filter((exercise) => {
      if (group !== "all" && exercise.group !== group) return false;
      if (equipment !== "all" && (exercise.equipment || "other") !== equipment) return false;
      if (!needle) return true;
      return (
        exercise.name.toLowerCase().includes(needle) ||
        exercise.primaryMuscles.some((muscle) => muscle.includes(needle)) ||
        exercise.secondaryMuscles.some((muscle) => muscle.includes(needle))
      );
    });
  }, [data, group, equipment, deferredQuery]);

  const shown = results.slice(0, limit);
  const activeGroup = GROUPS.find((item) => item.id === group);

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">MOVES</p>
        <div className="wrap">
          <p className="kicker">Exercise library</p>
          <h1>{activeGroup ? `${activeGroup.label} exercises.` : "Every lift, by muscle."}</h1>
          <p className="copy lede">
            {data ? `${data.length} exercises` : "Hundreds of exercises"} with a full-movement clip, target muscles, equipment, and step-by-step
            instructions. Pick a muscle group, then narrow by equipment.
          </p>
        </div>
      </section>

      <div className="schedule-tools">
        <div className="wrap tools-row">
          <div className="day-switch" role="group" aria-label="Muscle group">
            <button type="button" className={group === "all" ? "is-active" : ""} aria-pressed={group === "all"} onClick={() => setFilter("group", "all")}>
              All
            </button>
            {GROUPS.map((item) => (
              <button
                key={item.id}
                type="button"
                data-group={item.id}
                className={group === item.id ? "is-active" : ""}
                aria-pressed={group === item.id}
                onClick={() => setFilter("group", item.id)}
              >
                {item.label}
                {groupCounts[item.id] ? <small> {groupCounts[item.id]}</small> : null}
              </button>
            ))}
          </div>
          <label className="search-field">
            <span className="sr-only">Search exercises</span>
            <input
              type="search"
              placeholder="Search a lift or muscle"
              value={query}
              onChange={(event) => setFilter("q", event.target.value)}
            />
          </label>
        </div>
        <div className="wrap tools-row tools-row-secondary">
          <label className="select-field">
            <span>Equipment</span>
            <select value={equipment} onChange={(event) => setFilter("equipment", event.target.value)}>
              <option value="all">Any equipment</option>
              {EQUIPMENT.map((item) => (
                <option key={item} value={item}>{titleCase(item)}</option>
              ))}
            </select>
          </label>
          <p className="result-count" aria-live="polite">
            {data ? `${results.length} ${results.length === 1 ? "exercise" : "exercises"}` : error ? "Library unavailable" : "Loading library…"}
          </p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap">
          {error && (
            <p className="empty-day">
              The exercise library could not be loaded right now. Check your connection and try again.
            </p>
          )}
          {!data && !error && (
            <div className="ex-grid" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="ex-card ex-skeleton" key={index}></div>
              ))}
            </div>
          )}
          {data && results.length === 0 && <p className="empty-day">Nothing matches those filters. Try another muscle group or clear the search.</p>}
          {data && results.length > 0 && (
            <>
              <div className="ex-grid">
                {shown.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
              {shown.length < results.length && (
                <div className="load-more">
                  <button type="button" className="btn btn-ghost" onClick={() => setLimit((value) => value + PAGE)}>
                    Show more ({results.length - shown.length} left)
                  </button>
                </div>
              )}
            </>
          )}
          <p className="credit">
            Full-movement clips from{" "}
            <a href={SOURCE.url} target="_blank" rel="noreferrer">{SOURCE.name}</a> by AscendAPI. Free dataset, non-commercial use.
          </p>
        </div>
      </section>

      <CtaBand kicker="Want it coached" title="Pick a lift. We’ll watch the setup." />
    </>
  );
}
