import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand.jsx";
import { reduceMotion, useReveal, useTitle } from "../hooks.js";

export const coaches = [
  { initials: "MV", name: "Mara Voss", role: "Head coach · Strength", text: "Writes the iron block and runs the intro assessments. Mara cares more about a clean second rep than a loud first one.", tags: ["Squat", "Hinge", "New lifters"] },
  { initials: "JA", name: "Julian Adeyemi", role: "Conditioning", text: "Owns Engine. Julian builds intervals you can pace, then tells you when you are lying to yourself about that pace.", tags: ["Intervals", "Sled", "Engine 30"] },
  { initials: "PS", name: "Priya Shah", role: "Boxing", text: "Teaches Ringcraft like a skill class, because it is one. Feet first, hands second, power only when the shape is there.", tags: ["Guard", "Footwork", "Bag work"] },
  { initials: "LM", name: "Leo Martins", role: "Mobility", text: "Runs Reset in the quiet bay. Leo’s sessions are specific: positions you need for the lifts you already do.", tags: ["Hips", "Shoulders", "Breath"] },
  { initials: "NK", name: "Nora Klein", role: "Personal training", text: "Takes the private hours and the late Iron class. Nora is the coach you want when a lift has stalled and you are done guessing.", tags: ["Private", "Night Iron", "Return to train"] },
  { initials: "SO", name: "Sam Okonkwo", role: "Mixed conditioning", text: "Builds Yard. Sam programs the mixed hours so they support your strength block instead of wrecking it.", tags: ["Yard", "Carries", "Race prep"] },
];

export default function Trainers() {
  useTitle("Trainers — Anni Fitness");
  useReveal();
  const [spread, setSpread] = useState(false);
  const fanRef = useRef(null);

  const onFanMove = (event) => {
    const fan = fanRef.current;
    if (!fan || reduceMotion()) return;
    const rect = fan.getBoundingClientRect();
    fan.style.setProperty("--fan", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
  };
  const onFanLeave = () => fanRef.current?.style.removeProperty("--fan");

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">COACH</p>
        <div className="wrap page-hero-grid">
          <div>
            <p className="kicker">Coaches</p>
            <h1>Eyes on the room.</h1>
            <p className="copy lede">Six coaches. No one is hiding behind a clipboard. If your name is on the class, that coach is in the sets with you.</p>
          </div>
          <div className="fan-layout">
            <div className="fan-scene">
              <div
                ref={fanRef}
                className={`fan${spread ? " is-spread" : ""}`}
                aria-hidden="true"
                onPointerMove={onFanMove}
                onPointerLeave={onFanLeave}
              >
                <div className="fan-card">Iron</div>
                <div className="fan-card">Engine</div>
                <div className="fan-card">Ring</div>
                <div className="fan-card">Reset</div>
              </div>
            </div>
            <button type="button" className="btn btn-ghost" data-fan-toggle aria-pressed={spread} onClick={() => setSpread((v) => !v)}>
              {spread ? "Stack the floor" : "Spread the floor"}
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap trainer-grid">
          {coaches.map((coach) => (
            <article className="trainer reveal" key={coach.name}>
              <div className="mono" aria-hidden="true">{coach.initials}</div>
              <div>
                <h2>{coach.name}</h2>
                <p className="role">{coach.role}</p>
                <p className="copy">{coach.text}</p>
                <ul className="tags">
                  {coach.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link className="text-link" to={`/contact?coach=${encodeURIComponent(coach.name)}`}>
                  Train with {coach.name.split(" ")[0]}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand kicker="Private hours" title="Name the coach. Book the hour." label="Request a session" />
    </>
  );
}
