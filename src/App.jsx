import { useEffect } from "react";
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

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (!target) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return undefined;
    }
    const jump = () => target.scrollIntoView({ block: "start", behavior: "instant" });
    jump();
    let active = true;
    // Web fonts and the 3D stage settle after first paint, which moves the anchor.
    document.fonts?.ready.then(() => active && jump());
    const timer = setTimeout(() => active && jump(), 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [pathname, hash]);
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
