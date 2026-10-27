import { useState } from "react";
import { Link } from "react-router-dom";
import TiltCard from "../components/TiltCard.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { useReveal, useTitle } from "../hooks.js";

const plans = [
  {
    id: "day",
    kicker: "Drop in",
    title: "Day pass",
    price: { monthly: "$28", annual: "$28" },
    per: null,
    note: { monthly: "One day on the floor and one class.", annual: "One day on the floor and one class." },
    perks: ["Open floor for the day", "Any single coached class", "No commitment"],
    cta: ["Hold a day", "btn-ghost"],
  },
  {
    id: "member",
    kicker: "The membership",
    title: "Member",
    tag: "Most chosen",
    featured: true,
    price: { monthly: "$96", annual: "$82" },
    per: "/month",
    note: { monthly: "Billed monthly. Cancel with 30 days’ notice.", annual: "Billed annually at $984." },
    perks: ["Unlimited floor and classes", "Intro assessment included", "One guest pass each month", "Quiet bay during Reset"],
    cta: ["Start as a member", "btn-lime"],
  },
  {
    id: "elite",
    kicker: "Coaching plus",
    title: "Elite",
    price: { monthly: "$168", annual: "$142" },
    per: "/month",
    note: { monthly: "Billed monthly. Includes two private sessions.", annual: "Billed annually at $1,704." },
    perks: ["Everything in Member", "Two private sessions a month", "Priority class booking", "Locker, towel, bay anytime"],
    cta: ["Ask about Elite", "btn-ghost"],
  },
];

const compare = [
  ["Open floor", "That day", "Unlimited", "Unlimited"],
  ["Coached classes", "One", "Unlimited", "Unlimited"],
  ["Intro assessment", "Add-on", "Included", "Included"],
  ["Guest passes", "—", "1 / month", "4 / month"],
  ["Quiet bay", "—", "During Reset", "Anytime"],
  ["Private sessions", "—", "Booked extra", "2 / month"],
  ["Priority booking", "—", "—", "Yes"],
  ["Locker and towel", "—", "Locker", "Locker and towel"],
];

const faqs = [
  ["Can I start if I am new to lifting?", "Yes. Iron Fundamentals and every other class post a scale. The intro exists so your first week is not a guess."],
  ["Can I pause a membership?", "Member and Elite can freeze for up to eight weeks a year. Day passes do not roll over."],
  ["How do I cancel?", "After the first month, memberships cancel with 30 days’ notice from the desk or by email. Annual plans are paid up front."],
  ["What should I bring?", "Training shoes that can stay indoors, clothes you can hinge and run in, and a bottle. Gloves and wraps are at the desk for Ringcraft."],
  ["Is the quiet bay physical therapy?", "No. Reset is coached mobility. If you are injured, bring clearance from your clinician and we will program around it. We do not treat injuries."],
];

function Faq({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {question}
        <span className="faq-icon" aria-hidden="true"></span>
      </button>
      {open && (
        <div className="faq-a">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Membership() {
  useTitle("Membership — Anni Fitness");
  useReveal();
  const [bill, setBill] = useState("monthly");

  return (
    <>
      <section className="page-hero">
        <p className="watermark" aria-hidden="true">JOIN</p>
        <div className="wrap">
          <p className="kicker">Membership</p>
          <h1>Pay for coaching, not a crowded room.</h1>
          <p className="copy lede">Your first intro is free. After that, pick a day pass, a full membership, or Elite if you want private hours on the plan.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="bill-row">
            <div className="bill-toggle" role="group" aria-label="Billing period">
              <button type="button" data-bill="monthly" className={bill === "monthly" ? "is-active" : ""} aria-pressed={bill === "monthly"} onClick={() => setBill("monthly")}>
                Monthly
              </button>
              <button type="button" data-bill="annual" className={bill === "annual" ? "is-active" : ""} aria-pressed={bill === "annual"} onClick={() => setBill("annual")}>
                Annual <span>save 15%</span>
              </button>
            </div>
          </div>
          <div className="price-grid">
            {plans.map((plan) => (
              <TiltCard key={plan.id} className={plan.featured ? "is-featured" : ""}>
                {plan.tag && <p className="price-tag">{plan.tag}</p>}
                <p className="meta">{plan.kicker}</p>
                <h2>{plan.title}</h2>
                <p>
                  <span className="price-value">{plan.price[bill]}</span> {plan.per && <span className="per">{plan.per}</span>}
                </p>
                <p className="price-note">{plan.note[bill]}</p>
                <ul>
                  {plan.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <Link className={`btn ${plan.cta[1]}`} to="/contact">{plan.cta[0]}</Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Compare</p>
              <h2>What you actually get.</h2>
            </div>
          </div>
          <div className="table-scroll">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Included</th>
                  <th scope="col">Day pass</th>
                  <th scope="col">Member</th>
                  <th scope="col">Elite</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Questions</p>
              <h2>Before you sign.</h2>
            </div>
          </div>
          <div className="faq">
            {faqs.map(([question, answer]) => (
              <Faq key={question} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand kicker="Start clean" title="Book the free intro first." />
    </>
  );
}
