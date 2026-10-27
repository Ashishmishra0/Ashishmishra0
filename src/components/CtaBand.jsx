import { Link } from "react-router-dom";

export default function CtaBand({ kicker, title, to = "/contact", label = "Book an intro" }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <div>
          <p className="kicker">{kicker}</p>
          <h2>{title}</h2>
        </div>
        <Link className="btn btn-lime" to={to}>{label}</Link>
      </div>
    </section>
  );
}
