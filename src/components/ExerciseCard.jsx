import { useState } from "react";
import { Link } from "react-router-dom";
import { imageUrl, titleCase } from "../data/exercises.js";

export default function ExerciseCard({ exercise }) {
  const [frame, setFrame] = useState(0);
  const [start, finish = start] = exercise.images;

  return (
    <Link
      className="ex-card"
      to={`/exercises/${exercise.id}`}
      onPointerEnter={() => setFrame(1)}
      onPointerLeave={() => setFrame(0)}
      onFocus={() => setFrame(1)}
      onBlur={() => setFrame(0)}
    >
      <div className="ex-media">
        <img src={imageUrl(start)} alt="" loading="lazy" decoding="async" className={frame === 0 ? "is-shown" : ""} />
        <img src={imageUrl(finish)} alt="" loading="lazy" decoding="async" className={frame === 1 ? "is-shown" : ""} />
        <span className={`pill ex-level ex-level-${exercise.level}`}>{exercise.level}</span>
      </div>
      <div className="ex-body">
        <h3>{exercise.name}</h3>
        <p className="ex-muscles">{exercise.primaryMuscles.map(titleCase).join(", ")}</p>
        <p className="ex-meta">
          {titleCase(exercise.equipment || "No equipment")}
          {exercise.mechanic ? ` · ${titleCase(exercise.mechanic)}` : ""}
        </p>
      </div>
    </Link>
  );
}
