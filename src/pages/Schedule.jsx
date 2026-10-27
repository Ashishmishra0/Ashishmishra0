import { useState } from "react";
import CtaBand from "../components/CtaBand.jsx";
import { useTitle } from "../hooks.js";

const days = [
  ["mon", "Mon"],
  ["tue", "Tue"],
  ["wed", "Wed"],
  ["thu", "Thu"],
  ["fri", "Fri"],
  ["sat", "Sat"],
  ["sun", "Sun"],
];

const types = [
  ["all", "All"],
  ["strength", "Strength"],
  ["conditioning", "Conditioning"],
  ["boxing", "Boxing"],
  ["recovery", "Recovery"],
];

const s = (time, name, coach, room, mins, type) => ({ time, name, coach, room, mins, type });

const board = {
  mon: [
    s("05:30", "Dawn Iron", "Mara Voss", "Platforms", 60, "strength"),
    s("06:30", "Engine 30", "Julian Adeyemi", "Deck", 30, "conditioning"),
    s("12:10", "Ringcraft", "Priya Shah", "Ring", 50, "boxing"),
    s("17:30", "Yard", "Sam Okonkwo", "Deck", 55, "conditioning"),
    s("19:00", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
    s("20:15", "Night Iron", "Nora Klein", "Platforms", 60, "strength"),
  ],
  tue: [
    s("05:30", "Engine", "Julian Adeyemi", "Deck", 45, "conditioning"),
    s("09:30", "Iron Fundamentals", "Mara Voss", "Platforms", 60, "strength"),
    s("12:10", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
    s("17:30", "Ringcraft", "Priya Shah", "Ring", 50, "boxing"),
    s("18:45", "Yard", "Sam Okonkwo", "Deck", 55, "conditioning"),
  ],
  wed: [
    s("05:30", "Dawn Iron", "Nora Klein", "Platforms", 60, "strength"),
    s("06:30", "Engine 30", "Julian Adeyemi", "Deck", 30, "conditioning"),
    s("12:10", "Open Skill", "Priya Shah", "Ring", 50, "boxing"),
    s("17:30", "Iron", "Mara Voss", "Platforms", 60, "strength"),
    s("19:00", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
    s("20:15", "Engine", "Sam Okonkwo", "Deck", 45, "conditioning"),
  ],
  thu: [
    s("05:30", "Engine", "Julian Adeyemi", "Deck", 45, "conditioning"),
    s("09:30", "Iron Fundamentals", "Nora Klein", "Platforms", 60, "strength"),
    s("12:10", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
    s("17:30", "Ringcraft", "Priya Shah", "Ring", 50, "boxing"),
    s("19:00", "Yard", "Sam Okonkwo", "Deck", 55, "conditioning"),
  ],
  fri: [
    s("05:30", "Dawn Iron", "Mara Voss", "Platforms", 60, "strength"),
    s("06:30", "Engine 30", "Sam Okonkwo", "Deck", 30, "conditioning"),
    s("12:10", "Ringcraft", "Priya Shah", "Ring", 50, "boxing"),
    s("17:00", "Iron", "Nora Klein", "Platforms", 60, "strength"),
    s("18:15", "Yard", "Julian Adeyemi", "Deck", 55, "conditioning"),
    s("19:30", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
  ],
  sat: [
    s("08:00", "Iron", "Mara Voss", "Platforms", 60, "strength"),
    s("09:15", "Engine", "Julian Adeyemi", "Deck", 45, "conditioning"),
    s("10:30", "Ringcraft", "Priya Shah", "Ring", 50, "boxing"),
    s("12:00", "Yard", "Sam Okonkwo", "Deck", 55, "conditioning"),
    s("13:15", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
  ],
  sun: [
    s("09:00", "Iron Fundamentals", "Nora Klein", "Platforms", 60, "strength"),
    s("10:15", "Engine", "Sam Okonkwo", "Deck", 45, "conditioning"),
    s("11:30", "Reset", "Leo Martins", "Quiet bay", 40, "recovery"),
  ],
};

const typeLabel = Object.fromEntries(types);
const total = Object.values(board).reduce((sum, list) => sum + list.length, 0);

export default function Schedule() {
  useTitle("Schedule — Anni Fitness");
  const [day, setDay] = useState("mon");
  const [type, setType] = useState("all");

  const sessions = board[day].filter((item) => type === "all" || item.type === type);

  const onDayKey = (event, index) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (index + 1) % days.length : (index - 1 + days.length) % days.length;
    setDay(days[next][0]);
    event.currentTarget.parentElement.children[next].focus();
  };

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">WEEK</p>
        <div className="wrap">
          <p className="kicker">Class board</p>
          <h1>{total} coached hours. Pick a day.</h1>
          <p className="copy lede">The floor is open with the club. These are the hours a coach is running a plan. Filter the day if you only want one lane.</p>
        </div>
      </section>

      <div className="schedule-tools">
        <div className="wrap tools-row">
          <div className="day-switch" role="tablist" aria-label="Day of the week">
            {days.map(([id, label], index) => (
              <button
                key={id}
                type="button"
                role="tab"
                data-day={id}
                className={day === id ? "is-active" : ""}
                aria-selected={day === id}
                tabIndex={day === id ? 0 : -1}
                onClick={() => setDay(id)}
                onKeyDown={(event) => onDayKey(event, index)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="type-switch" role="group" aria-label="Class type">
            {types.map(([id, label]) => (
              <button key={id} type="button" data-type-filter={id} className={type === id ? "is-active" : ""} aria-pressed={type === id} onClick={() => setType(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="day-panel" role="tabpanel">
            {sessions.map((item) => (
              <article className="session" data-type={item.type} key={`${day}-${item.time}-${item.name}`}>
                <p className="session-time">{item.time}</p>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.coach} · {item.room} · {item.mins} min
                  </p>
                </div>
                <span className={`pill pill-${item.type}`}>{typeLabel[item.type]}</span>
              </article>
            ))}
            {sessions.length === 0 && <p className="empty-day">Nothing in this filter. Try another type.</p>}
          </div>
          <p className="copy" style={{ marginTop: "1.5rem" }}>Arrive ten minutes early for the first class of a block. The floor stays open outside these hours until close.</p>
        </div>
      </section>

      <CtaBand kicker="Save a spot" title="Intros are booked, not walked." />
    </>
  );
}
