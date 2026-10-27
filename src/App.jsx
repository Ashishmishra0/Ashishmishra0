import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Programs from "./pages/Programs.jsx";
import Trainers from "./pages/Trainers.jsx";
import Membership from "./pages/Membership.jsx";
import Schedule from "./pages/Schedule.jsx";
import Contact from "./pages/Contact.jsx";
import Exercises from "./pages/Exercises.jsx";
import ExerciseDetail from "./pages/ExerciseDetail.jsx";

function ScrollManager() {
  const { pathname, hash, search } = useLocation();
  const previousPath = useRef(null);
  useEffect(() => {
    const samePage = previousPath.current === pathname;
    previousPath.current = pathname;
    // Filter changes on the library page only touch the query string; keep the scroll position.
    if (samePage && pathname === "/exercises") return undefined;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    // Turning smooth scrolling off for the jump also cancels any smooth scroll still running
    // from the previous page, which would otherwise carry over onto the new one.
    const instant = (fn) => {
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      void root.offsetHeight; // apply the style change before scrolling
      fn();
      requestAnimationFrame(() => {
        root.style.scrollBehavior = "";
      });
    };
    if (!target) {
      instant(() => window.scrollTo(0, 0));
      return undefined;
    }
    const jump = () => instant(() => target.scrollIntoView({ block: "start" }));
    jump();
    let active = true;
    // Web fonts and the 3D stage settle after first paint, which moves the anchor.
    document.fonts?.ready.then(() => active && jump());
    const timer = setTimeout(() => active && jump(), 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [pathname, hash, search]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/:id" element={<ExerciseDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
