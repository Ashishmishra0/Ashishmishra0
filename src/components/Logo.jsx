import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="1.2" y="1.2" width="29.6" height="29.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8.5 24.5 16 7.5 23.5 24.5" fill="none" stroke="#d6ff3f" strokeWidth="2" />
        <path d="M11.2 18.6h9.6" stroke="#d6ff3f" strokeWidth="2" />
      </svg>
      <span className="logo-type">
        Anni <em>Fitness</em>
      </span>
    </Link>
  );
}
