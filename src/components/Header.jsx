import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";
import { Barbell, Plate } from "./Marks.jsx";

const links = [
  ["/about", "About"],
  ["/programs", "Programs"],
  ["/exercises", "Exercises"],
  ["/trainers", "Trainers"],
  ["/membership", "Membership"],
  ["/schedule", "Schedule"],
  ["/contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ctaTo = pathname === "/membership" ? "/contact" : "/membership";
  const ctaLabel = pathname === "/membership" ? "Book" : "Join";

  return (
    <>
      <header className="dock">
        <Logo />
        <p className="dock-status">
          <i></i>
          Floor open · 05:00
        </p>
        <div className="dock-actions">
          <button
            type="button"
            className={`nav-toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
          </button>
          <Link className="btn btn-primary nav-cta" to={ctaTo}>
            {ctaLabel}
          </Link>
        </div>
      </header>
      <nav className={`nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Primary">
        <div className="nav-gear" aria-hidden="true">
          <Plate weight="20" />
          <Barbell />
        </div>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
        <Link className="nav-join btn btn-primary" to="/membership" onClick={() => setOpen(false)}>
          Join the club
        </Link>
      </nav>
    </>
  );
}
