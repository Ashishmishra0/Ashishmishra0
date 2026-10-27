import { useEffect, useImperativeHandle, useRef, useState, forwardRef } from "react";

const loadScene = () => import("../three/createScene.js");

const FALLBACKS = {
  dumbbell: <div className="bar-graphic"></div>,
  mark: <div className="fallback-mark"></div>,
  kettlebell: <div className="fallback-bell"></div>,
};

const Scene = forwardRef(function Scene({ kind, label, hint, load }, ref) {
  const canvasRef = useRef(null);
  const handleRef = useRef(null);
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);

  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    let cancelled = false;
    loadScene()
      .then(({ createScene }) => {
        if (cancelled) return;
        handleRef.current = createScene(canvas, kind);
        if (loadRef.current) handleRef.current.setLoad(loadRef.current);
        setLive(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      handleRef.current?.dispose();
      handleRef.current = null;
      setLive(false);
    };
  }, [kind]);

  useEffect(() => {
    if (load) handleRef.current?.setLoad(load);
  }, [load]);

  useImperativeHandle(ref, () => ({
    swing: () => handleRef.current?.swing(),
  }));

  return (
    <div className={`stage${live ? " is-live" : ""}`}>
      <div className="stage-frame" aria-hidden="true"></div>
      <canvas
        ref={canvasRef}
        data-scene={kind}
        tabIndex={failed ? -1 : 0}
        aria-hidden={failed || undefined}
        aria-label={label}
      ></canvas>
      <div className="fallback" aria-hidden="true">{FALLBACKS[kind]}</div>
      <p className="stage-hint">{hint}</p>
    </div>
  );
});

export default Scene;
