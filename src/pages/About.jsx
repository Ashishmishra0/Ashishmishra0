import Scene from "../components/Scene.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { useReveal, useTitle } from "../hooks.js";

const principles = [
  ["01", "Coaching over chaos", "If a class cannot be coached properly, it does not go on the board."],
  ["02", "Load that matches the person", "The board shows the intent. Your weight is a decision, not a dare."],
  ["03", "Leave better than you arrived", "Sweat is welcome. So is going home able to train again tomorrow."],
];

const intro = [
  ["01", "A conversation", "Training history, schedule, and what you want the next block to feel like. No tour script."],
  ["02", "A screen", "Squat, hinge, push, and a short conditioning piece so we can place you in the right class."],
  ["03", "A starting plan", "You leave with a class lane, a first-week schedule, and a load that makes sense on Monday."],
];

export default function About() {
  useTitle("About — Anni Fitness");
  useReveal();

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">ABOUT</p>
        <div className="wrap page-hero-grid">
          <div>
            <p className="kicker">The club</p>
            <h1>A room with a point of view.</h1>
            <p className="copy lede">
              Anni Fitness started from a simple bias: a gym should feel precise. Heavy iron, clean coaching, and no clutter between you and the work.
            </p>
          </div>
          <div className="stage-block">
            <Scene
              kind="mark"
              hint="Drag the mark"
              label="Interactive 3D Anni mark made of three rings. Drag or use arrow keys to rotate."
            />
            <p className="stage-note">Three rings — strength, engine, recovery. Turn them.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap story-grid">
          <h2>Less noise. More reps that count.</h2>
          <div>
            <p className="copy">
              The club is three rooms with one standard. The iron floor is for barbell strength. The engine deck is for conditioning you can repeat. The quiet bay is where mobility and breath keep the other two honest.
            </p>
            <p className="copy" style={{ marginTop: "1rem" }}>
              Classes are programmed in blocks. Coaches know the plan before the clock starts, and members know how to scale it. Beginners are expected. So are people chasing a bigger total.
            </p>
            <div className="principles">
              {principles.map(([no, title, text]) => (
                <article key={no}>
                  <strong>{no}</strong>
                  <div>
                    <h3>{title}</h3>
                    <p className="copy">{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Day one</p>
              <h2>What the intro actually is.</h2>
            </div>
          </div>
          <ol className="steps">
            {intro.map(([no, title, text]) => (
              <li className="reveal" key={no}>
                <span>{no}</span>
                <h3>{title}</h3>
                <p className="copy">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand kicker="Meet the floor" title="The coaches are the product." to="/trainers" label="See the coaches" />
    </>
  );
}
