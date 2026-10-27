import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  ["/about", "About"],
  ["/programs", "Programs"],
  ["/trainers", "Trainers"],
  ["/membership", "Membership"],
  ["/schedule", "Schedule"],
  ["/contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap nav-bar">
        <Logo />
        <button
          type="button"
          className={`nav-toggle${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <i></i>
          <i></i>
        </button>
        <nav className={`nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Primary">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link className="nav-join btn btn-lime" to="/membership" onClick={() => setOpen(false)}>
            Join the club
          </Link>
        </nav>
        <Link className="btn btn-lime nav-cta" to={ctaTo}>
          {ctaLabel}
        </Link>
      </div>
    </header>
  );
}
