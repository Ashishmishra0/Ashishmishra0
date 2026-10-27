import { useState } from "react";
import { Link } from "react-router-dom";
import Scene from "../components/Scene.jsx";
import Stat from "../components/Stat.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { useReveal, useTitle } from "../hooks.js";
import { GROUPS, titleCase } from "../data/exercises.js";

const LOAD_LABELS = {
  light: "Light plates on the bar.",
  standard: "Standard plates on the bar.",
  heavy: "Heavy plates on the bar.",
};

const tickerItems = ["Strength", "Engine", "Boxing", "Yard", "Reset", "Anni Fitness"];

const rooms = [
  ["01", "The Iron Floor", "Platforms, racks, and bars laid out for strength work that stays technical when the load gets honest."],
  ["02", "The Engine Deck", "Sleds, ropes, and a clock with a point of view. Intervals here are coached, not chaotic."],
  ["03", "The Quiet Bay", "Mobility, breath, and the unglamorous work that lets you train again next week."],
];

const programs = [
  ["01 · Strength", "Iron", "60 min · All levels", "Barbell strength with a coach close enough to fix the second rep, not just the first.", "iron"],
  ["02 · Conditioning", "Engine", "45 min · All levels", "Repeatable intervals that build a bigger engine without turning the hour into a scramble.", "engine"],
  ["03 · Boxing", "Ringcraft", "50 min · All levels", "Footwork, guard, and bag rounds. Skill first, sweat as the side effect.", "ringcraft"],
];

const steps = [
  ["01", "Assess", "Your intro is a conversation and a movement screen. We set a starting load before we set a goal."],
  ["02", "Build", "Classes follow a block, not a random whiteboard. Strength, engine, and skill each have a lane."],
  ["03", "Adjust", "Coaches change the plan when your life, sleep, or joints change. Progress is the point, not punishment."],
];

export default function Home() {
  useTitle("Anni Fitness — Train with intent");
  useReveal();
  const [load, setLoad] = useState("standard");

  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="wrap hero-grid">
          <div className="hero-title">
            <p className="kicker">Open floor · Coached daily</p>
            <h1>
              Train with
              <br />
              <span className="stroke">
                intent<span className="dot-char">.</span>
              </span>
            </h1>
          </div>
          <div className="stage-block">
            <Scene
              kind="dumbbell"
              load={load}
              hint="Drag to rotate"
              label="Interactive 3D barbell. Drag, or use the arrow keys, to rotate it. Plate load controls sit below."
            />
            <div className="plate-picker" role="group" aria-label="Plate load">
              {["light", "standard", "heavy"].map((name) => (
                <button
                  key={name}
                  type="button"
                  data-load={name}
                  className={load === name ? "is-active" : ""}
                  aria-pressed={load === name}
                  onClick={() => setLoad(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">{LOAD_LABELS[load]}</p>
          </div>
          <div className="hero-copy">
            <p className="copy">
              Anni Fitness is a sharp, modern club for people who want the room to feel serious and the coaching to feel personal. Strength, engine work, boxing, and recovery — one standard, three rooms.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/membership">Start a membership</Link>
              <Link className="btn btn-ghost" to="/schedule">See the schedule</Link>
            </div>
            <ul className="hero-meta">
              <li>First session free</li>
              <li>Every level has a scale</li>
              <li>Floor opens at 5:00</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {tickerItems.map((item) => (
                <span key={item} style={{ display: "contents" }}>
                  <span>{item}</span>
                  <i></i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="stats" aria-label="Club in numbers">
        <div className="wrap stat-row">
          <Stat value={36} label="Coached classes each week" />
          <Stat value={6} label="Coaches on the floor" />
          <Stat value={3} label="Rooms, each with a job" />
          <Stat value={7} label="Days the floor is open" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">The floor</p>
              <h2>Built like a club, not a crowd.</h2>
            </div>
            <Link className="text-link" to="/about">The Anni way</Link>
          </div>
          <div className="room-grid">
            {rooms.map(([no, title, text]) => (
              <article className="room reveal" key={no}>
                <p className="room-no">{no}</p>
                <h3>{title}</h3>
                <p className="copy">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Programs</p>
              <h2>Pick a lane. Or mix them.</h2>
            </div>
            <Link className="text-link" to="/programs">All programs</Link>
          </div>
          <div className="card-grid">
            {programs.map(([index, title, meta, text, anchor]) => (
              <article className="program-card reveal" key={anchor}>
                <p className="index">{index}</p>
                <h3>{title}</h3>
                <p className="meta">{meta}</p>
                <p>{text}</p>
                <Link className="text-link" to={`/programs#${anchor}`}>View {title}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Exercise library</p>
              <h2>Every lift, by muscle.</h2>
            </div>
            <Link className="text-link" to="/exercises">Open the library</Link>
          </div>
          <div className="muscle-grid">
            {GROUPS.filter((group) => group.id !== "neck").map((group, index) => (
              <Link className="muscle-tile reveal" to={`/exercises?group=${group.id}`} key={group.id}>
                <span className="muscle-no">0{index + 1}</span>
                <span className="muscle-name">{group.label}</span>
                <span className="muscle-list">{group.muscles.map(titleCase).join(" · ")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-band">
        <div className="wrap">
          <blockquote>
            <p>I came for a heavier deadlift. I stayed because someone actually watched the setup.</p>
            <footer>Member · Iron block</footer>
          </blockquote>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">How a block works</p>
              <h2>Three moves. Then repeat.</h2>
            </div>
          </div>
          <ol className="steps">
            {steps.map(([no, title, text]) => (
              <li className="reveal" key={no}>
                <span>{no}</span>
                <h3>{title}</h3>
                <p className="copy">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand kicker="First visit" title="Come in. Lift something. Leave with a plan." />
    </>
  );
}
