import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>A modern training club for strength, conditioning, boxing, and recovery.</p>
        </div>
        <div>
          <h2>Visit</h2>
          <p>
            18 North Yard
            <br />
            Studio level
            <br />
            Mon–Fri 5:00–22:00
            <br />
            Sat 7:00–18:00
            <br />
            Sun 8:00–14:00
          </p>
        </div>
        <div>
          <h2>Train</h2>
          <ul>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/exercises">Exercise library</Link></li>
            <li><Link to="/trainers">Trainers</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/membership">Membership</Link></li>
          </ul>
        </div>
        <div>
          <h2>Desk</h2>
          <p><a href="mailto:hello@annifitness.example">hello@annifitness.example</a></p>
          <p style={{ margin: "0.8rem 0 1rem" }}>Intro sessions are booked from the desk, not at the turnstile.</p>
          <Link className="btn btn-lime" to="/contact">Book an intro</Link>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} Anni Fitness</p>
        <p>Train with intent.</p>
      </div>
    </footer>
  );
}
