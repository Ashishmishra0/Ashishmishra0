import { useEffect, useState } from "react";

// Free Exercise DB (public domain): https://github.com/yuhonas/free-exercise-db
const BASE = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main";

export const SOURCE = {
  name: "Free Exercise DB",
  url: "https://github.com/yuhonas/free-exercise-db",
};

export const GROUPS = [
  { id: "chest", label: "Chest", muscles: ["chest"] },
  { id: "back", label: "Back", muscles: ["lats", "middle back", "lower back", "traps"] },
  { id: "shoulders", label: "Shoulders", muscles: ["shoulders"] },
  { id: "arms", label: "Arms", muscles: ["biceps", "triceps", "forearms"] },
  { id: "legs", label: "Legs", muscles: ["quadriceps", "hamstrings", "glutes", "calves", "adductors", "abductors"] },
  { id: "core", label: "Core", muscles: ["abdominals"] },
  { id: "neck", label: "Neck", muscles: ["neck"] },
];

export const LEVELS = ["beginner", "intermediate", "expert"];

export const EQUIPMENT = [
  "barbell",
  "dumbbell",
  "kettlebells",
  "cable",
  "machine",
  "body only",
  "bands",
  "medicine ball",
  "exercise ball",
  "e-z curl bar",
  "foam roll",
  "other",
];

const muscleToGroup = new Map();
GROUPS.forEach((group) => group.muscles.forEach((muscle) => muscleToGroup.set(muscle, group.id)));

export const groupOf = (exercise) => muscleToGroup.get(exercise.primaryMuscles[0]) || "other";
export const groupLabel = (id) => GROUPS.find((group) => group.id === id)?.label || "Other";

export const imageUrl = (path) => `${BASE}/exercises/${path}`;

export const titleCase = (text = "") => text.replace(/\b\w/g, (char) => char.toUpperCase());

let request;

export function loadExercises() {
  if (!request) {
    request = fetch(`${BASE}/dist/exercises.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Exercise library responded ${response.status}`);
        return response.json();
      })
      .then((list) =>
        list
          .filter((exercise) => exercise.images?.length)
          .map((exercise) => ({ ...exercise, group: groupOf(exercise) }))
          .sort((a, b) => a.name.localeCompare(b.name)),
      )
      .catch((error) => {
        request = null;
        throw error;
      });
  }
  return request;
}

export function useExercises() {
  const [state, setState] = useState({ data: null, error: null });

  useEffect(() => {
    let active = true;
    loadExercises()
      .then((data) => active && setState({ data, error: null }))
      .catch((error) => active && setState({ data: null, error }));
    return () => {
      active = false;
    };
  }, []);

  return state;
}
