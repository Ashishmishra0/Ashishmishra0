import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "../hooks.js";
import { coaches } from "./Trainers.jsx";

const goals = ["Get stronger", "Conditioning", "Boxing", "Mobility", "Not sure yet"];
const coachNames = coaches.map((coach) => coach.name);
const empty = { name: "", email: "", goal: "", coach: "", note: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "This field is required.";
  if (!values.email.trim()) errors.email = "This field is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email.";
  if (!values.goal) errors.goal = "This field is required.";
  return errors;
}

export default function Contact() {
  useTitle("Contact — Anni Fitness");
  const [params] = useSearchParams();
  const requested = params.get("coach");
  const presetCoach = coachNames.includes(requested) ? requested : "";

  const [values, setValues] = useState({ ...empty, coach: presetCoach });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setValues((current) => ({ ...current, coach: presetCoach }));
  }, [presetCoach]);

  const update = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setSuccess("");
      const first = Object.keys(next)[0];
      event.currentTarget.querySelector(`#${first}`)?.focus();
      return;
    }
    setSuccess(
      `Thanks, ${values.name.trim()}. This preview keeps your note in the browser only — connect the form before launch and the desk will write back.`,
    );
    setValues({ ...empty, coach: presetCoach });
  };

  const field = (id, label, control) => (
    <label className={`field${id === "note" ? " wide" : ""}`}>
      <span>{label}</span>
      {control}
      <small className="field-error">{errors[id] || ""}</small>
    </label>
  );

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">DESK</p>
        <div className="wrap">
          <p className="kicker">The desk</p>
          <h1>{presetCoach ? `Training with ${presetCoach}` : "Book the intro."}</h1>
          <p className="copy lede">Tell us the lane you want and the days you can train. We reply with a time, not a brochure.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap contact-grid">
          <form id="visit-form" noValidate onSubmit={onSubmit}>
            <div className="form-grid">
              {field("name", "Name", <input id="name" name="name" type="text" autoComplete="name" required value={values.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} />)}
              {field("email", "Email", <input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update("email")} aria-invalid={Boolean(errors.email)} />)}
              {field(
                "goal",
                "Goal",
                <select id="goal" name="goal" required value={values.goal} onChange={update("goal")} aria-invalid={Boolean(errors.goal)}>
                  <option value="">Choose one</option>
                  {goals.map((goal) => (
                    <option key={goal}>{goal}</option>
                  ))}
                </select>,
              )}
              {field(
                "coach",
                "Coach",
                <select id="coach" name="coach" value={values.coach} onChange={update("coach")}>
                  <option value="">No preference</option>
                  {coachNames.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>,
              )}
              {field(
                "note",
                "Note",
                <textarea id="note" name="note" value={values.note} onChange={update("note")} placeholder="Days you can train, injuries we should know about, or the lift you want watched."></textarea>,
              )}
            </div>
            <button className="btn btn-primary" type="submit" style={{ marginTop: "0.4rem" }}>Send to the desk</button>
            {success && (
              <p id="form-success" className="form-success" role="status">{success}</p>
            )}
          </form>

          <aside className="visit-card">
            <div className="badge-3d" aria-hidden="true">
              <div className="badge-3d-inner"><span>ANNI</span></div>
            </div>
            <div>
              <h2>Visit</h2>
              <p className="copy">
                18 North Yard
                <br />
                Studio level
              </p>
            </div>
            <dl className="hours">
              <dt>Mon–Fri</dt><dd>5:00–22:00</dd>
              <dt>Saturday</dt><dd>7:00–18:00</dd>
              <dt>Sunday</dt><dd>8:00–14:00</dd>
            </dl>
            <p><a className="text-link" href="mailto:hello@annifitness.example">hello@annifitness.example</a></p>
            <p className="copy">Indoor shoes only. Lockers are on the studio level. The first intro is free and lasts about fifty minutes.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
