import { useState } from "react";
import { Link } from "react-router-dom";
import { titleCase } from "../data/exercises.js";

export default function ExerciseCard({ exercise }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link className="ex-card" to={`/exercises/${exercise.id}`}>
      <div className="ex-media">
        {failed ? (
          <p className="ex-missing">Clip unavailable</p>
        ) : (
          <img src={exercise.gif} alt="" loading="lazy" decoding="async" className="is-shown" onError={() => setFailed(true)} />
        )}
        <span className="pill ex-level">Full clip</span>
      </div>
      <div className="ex-body">
        <h3>{exercise.name}</h3>
        <p className="ex-muscles">{exercise.primaryMuscles.map(titleCase).join(", ")}</p>
        <p className="ex-meta">{titleCase(exercise.equipment || "No equipment")}</p>
      </div>
    </Link>
  );
}
