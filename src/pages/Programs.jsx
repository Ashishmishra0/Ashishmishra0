import { useRef } from "react";
import { Link } from "react-router-dom";
import Scene from "../components/Scene.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { useReveal, useTitle } from "../hooks.js";

const programs = [
  {
    id: "iron",
    no: "01",
    title: "Iron",
    meta: "60 min · Strength · Platforms",
    text: "Barbell strength for people who want the big lifts to look the same on rep five as they did on rep one. Squat, hinge, push, and pull rotate through the block.",
    points: [
      "Loads posted as ranges, not a single heroic number",
      "Technique notes written on the board before the clock starts",
      "A fundamentals option in the late morning for newer lifters",
    ],
  },
  {
    id: "engine",
    no: "02",
    title: "Engine",
    meta: "30–45 min · Conditioning · Deck",
    text: "Intervals with a purpose: repeatable pieces that build a bigger engine and still leave your strength work intact.",
    points: [
      "Rower, ski, sled, and carry stations with a coach on the transitions",
      "Short Engine 30 at dawn, longer pieces in the evening",
      "Pacing targets so the first round is not the whole session",
    ],
  },
  {
    id: "ringcraft",
    no: "03",
    title: "Ringcraft",
    meta: "50 min · Boxing · Ring",
    text: "Guard, feet, and bag rounds. The class teaches the skill, then lets the sweat catch up. No sparring in the group hour.",
    points: [
      "Gloves and wraps are available at the desk",
      "Partner drills stay technical — power is optional",
      "Open skill slots for members who want extra rounds",
    ],
  },
  {
    id: "yard",
    no: "04",
    title: "Yard",
    meta: "55 min · Mixed · Deck",
    text: "A coached mixed session for people training toward a race, a test, or just a harder Saturday. Stations rotate. The plan does not.",
    points: [
      "Run, carry, sled, and a strength piece in one hour",
      "Scaled distances posted beside the full effort",
      "Built to sit next to Iron, not replace it",
    ],
  },
  {
    id: "reset",
    no: "05",
    title: "Reset",
    meta: "40 min · Mobility · Quiet bay",
    text: "Hips, shoulders, breath, and positions you actually use under a bar. This is training, not a cooldown you skip.",
    points: ["Low lights, no leaderboard", "Useful if you lift heavy or sit all day", "Members on Elite can book the bay outside class"],
  },
  {
    id: "private",
    no: "06",
    title: "Private",
    meta: "50 min · One to one · Any room",
    text: "Coaching for a specific lift, a return from time off, or a block you want watched closely. Elite membership includes two sessions a month.",
    points: ["Booked with a named coach", "Plan written down so the next class matches it", "Not a sales hour — you train"],
  },
];

export default function Programs() {
  useTitle("Programs — Anni Fitness");
  useReveal();
  const sceneRef = useRef(null);

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">TRAIN</p>
        <div className="wrap page-hero-grid">
          <div>
            <p className="kicker">Programs</p>
            <h1>Six lanes. One standard.</h1>
            <p className="copy lede">Every class has a coach, a clock, and a way to scale. Mix the week or stay in one lane until the block is done.</p>
            <div className="hero-actions" style={{ marginTop: "1.3rem" }}>
              <Link className="btn btn-primary" to="/schedule">This week’s board</Link>
              <Link className="btn btn-ghost" to="/membership">Membership</Link>
            </div>
          </div>
          <div className="stage-block">
            <Scene
              ref={sceneRef}
              kind="kettlebell"
              hint="Drag to turn"
              label="Interactive 3D kettlebell. Drag or use arrow keys to rotate. The swing button plays one rep."
            />
            <div className="stage-controls">
              <button type="button" className="btn btn-ghost" data-swing onClick={() => sceneRef.current?.swing()}>
                Swing the bell
              </button>
              <p className="stage-note">One rep. Then set it down.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          {programs.map((program) => (
            <article className="program" id={program.id} key={program.id}>
              <p className="program-index">{program.no}</p>
              <div>
                <h2>{program.title}</h2>
                <p className="meta">{program.meta}</p>
                <p className="copy">{program.text}</p>
                <ul>
                  {program.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand kicker="Not sure where to start" title="The intro puts you in the right lane." />
    </>
  );
}
