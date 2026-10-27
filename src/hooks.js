import { useEffect, useState } from "react";

export const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll(".reveal")];
    if (reduceMotion()) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return undefined;
    }
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          seen.unobserve(entry.target);
        });
      },
      { threshold: 0.16 },
    );
    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${(index % 3) * 80}ms`;
      seen.observe(node);
    });
    return () => seen.disconnect();
  }, []);
}

export function useCountUp(target, ref) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduceMotion()) {
      setValue(target);
      return undefined;
    }
    let frame = 0;
    const counter = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        counter.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / 900);
          const eased = 1 - (1 - progress) ** 3;
          setValue(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    counter.observe(node);
    return () => {
      counter.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, ref]);
  return value;
}
