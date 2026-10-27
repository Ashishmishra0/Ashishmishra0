import { useRef } from "react";
import { reduceMotion } from "../hooks.js";

export default function TiltCard({ className = "", children }) {
  const ref = useRef(null);

  const onMove = (event) => {
    const card = ref.current;
    if (!card || reduceMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div className="tilt-wrap">
      <article ref={ref} className={`price-card tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </article>
    </div>
  );
}
