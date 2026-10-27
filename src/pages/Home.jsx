import { useState } from "react";
import { Link } from "react-router-dom";
import Scene from "../components/Scene.jsx";
import Stat from "../components/Stat.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { Barbell, Dumbbell, Kettlebell, MedBall, Plate, Rope } from "../components/Marks.jsx";
import { useReveal, useTitle } from "../hooks.js";
import { GROUPS, titleCase } from "../data/exercises.js";

const LOAD_LABELS = {
  light: "Light plates on the bar.",
  standard: "Standard plates on the bar.",
  heavy: "Heavy plates on the bar.",
};

const ribbonA = [
  ["Iron", Barbell],
  ["Engine", Rope],
  ["Ringcraft", MedBall],
  ["Reset", Plate],
  ["Yard", Dumbbell],
  ["One more set", Kettlebell],
];

const ribbonB = [
  ["Barbell", Barbell],
  ["Dumbbell", Dumbbell],
  ["Kettlebell", Kettlebell],
  ["Plate", Plate],
  ["Rope", Rope],
  ["Med ball", MedBall],
];

const rooms = [
  ["01", "The Iron Floor", "Platforms, racks, and bars laid out for strength work that stays technical when the load gets honest.", Barbell],
  ["02", "The Engine Deck", "Sleds, ropes, and a clock with a point of view. Intervals here are coached, not chaotic.", Rope],
  ["03", "The Quiet Bay", "Mobility, breath, and the unglamorous work that lets you train again next week.", Kettlebell],
];

const programs = [
  ["01 · Strength", "Iron", "60 min · All levels", "Barbell strength with a coach close enough to fix the second rep, not just the first.", "iron", Barbell],
  ["02 · Conditioning", "Engine", "45 min · All levels", "Repeatable intervals that build a bigger engine without turning the hour into a scramble.", "engine", Rope],
  ["03 · Boxing", "Ringcraft", "50 min · All levels", "Footwork, guard, and bag rounds. Skill first, sweat as the side effect.", "ringcraft", MedBall],
];

const steps = [
  ["01", "Assess", "Your intro is a conversation and a movement screen. We set a starting load before we set a goal."],
  ["02", "Build", "Classes follow a block, not a random whiteboard. Strength, engine, and skill each have a lane."],
  ["03", "Adjust", "Coaches change the plan when your life, sleep, or joints change. Progress is the point, not punishment."],
];

function Ribbon({ items, className }) {
  return (
    <div className={`ribbon ${className}`}>
      <div className="ribbon-track">
        {[0, 1].map((copy) => (
          <div className="ribbon-group" key={copy}>
            {items.map(([label, Icon]) => (
              <span key={label}>
                <Icon />
                {label}
                <b aria-hidden="true">✱</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useTitle("Anni Fitness — Train with intent");
  useReveal();
  const [load, setLoad] = useState("standard");

  return (
    <>
      <section className="splash">
        <div className="stripes" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i>
        </div>
        <div className="float-gear" aria-hidden="true">
          <Plate className="gear gear-plate" weight="25" />
          <Dumbbell className="gear gear-dumbbell" />
          <Kettlebell className="gear gear-bell" />
          <MedBall className="gear gear-ball" />
        </div>
        <div className="splash-layout">
          <h1 className="splash-word">
            Anni
            <em>train with intent.</em>
          </h1>
          <div className="splash-stage">
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
        </div>
      </section>

      <div className="ribbons" aria-hidden="true">
        <Ribbon items={ribbonA} className="ribbon-down" />
        <Ribbon items={ribbonB} className="ribbon-up" />
      </div>

      <section className="section ticket-section">
        <div className="wrap ticket-layout">
          <article className="ticket">
            <p className="kicker">The club</p>
            <h2>Anni</h2>
            <p className="ticket-pos">[AH-NEE] noun · a training club</p>
            <p className="copy">
              A room you enter for one session and leave three hours later, because someone watched the setup and the next set looked better. Strength, engine work, boxing, and recovery — one standard, three rooms.
            </p>
            <p className="syn">Synonyms: open floor, a coach in the sets, one more rep</p>
            <p className="script-line">one more set.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/membership">Start a membership</Link>
              <Link className="btn btn-ghost" to="/schedule">See the schedule</Link>
            </div>
            <ul className="hero-meta">
              <li>First session free</li>
              <li>Every level has a scale</li>
              <li>Floor opens at 5:00</li>
            </ul>
          </article>
          <div className="ticket-side" aria-hidden="true">
            <Plate className="side-plate" weight="20" />
            <Dumbbell className="side-dumbbell" />
            <Barbell className="side-barbell" />
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Club in numbers">
        <div className="wrap stat-row">
          <Stat value={36} label="Coached classes each week" />
          <Stat value={6} label="Coaches on the floor" />
          <Stat value={3} label="Rooms, one job each" />
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
            {rooms.map(([no, title, text, Icon]) => (
              <article className="room reveal" key={no}>
                <Icon />
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
          <div className="card-rail">
            {programs.map(([index, title, meta, text, anchor, Icon]) => (
              <article className="program-card reveal" key={anchor}>
                <Icon />
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
