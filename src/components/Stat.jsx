import { useRef } from "react";
import { useCountUp } from "../hooks.js";

export default function Stat({ value, label }) {
  const ref = useRef(null);
  const shown = useCountUp(value, ref);
  return (
    <article className="reveal" ref={ref}>
      <p className="stat-num">{shown}</p>
      <p>{label}</p>
    </article>
  );
}
