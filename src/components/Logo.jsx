import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 23.5 16 8.5l7 15" fill="none" stroke="#ff4f1f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.8 18.4h8.4" stroke="#ff4f1f" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="logo-type">
        Anni <em>Fitness</em>
      </span>
    </Link>
  );
}
