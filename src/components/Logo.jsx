import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Anni Fitness, home">
      <span className="logo-badge" aria-hidden="true">A</span>
      <span className="logo-type">
        Anni <em>Fitness</em>
      </span>
    </Link>
  );
}
