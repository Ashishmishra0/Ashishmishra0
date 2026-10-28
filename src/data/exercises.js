import { useEffect, useState } from "react";

// Free ExerciseDB dataset (AscendAPI): full-movement GIFs, non-commercial use, attribution required.
// https://oss.exercisedb.dev/docs
export const SOURCE = {
  name: "ExerciseDB",
  url: "https://oss.exercisedb.dev/docs",
};

export const GROUPS = [
  { id: "chest", label: "Chest", muscles: ["pectorals"] },
  { id: "back", label: "Back", muscles: ["lats", "upper back", "traps"] },
  { id: "shoulders", label: "Shoulders", muscles: ["delts"] },
  { id: "arms", label: "Arms", muscles: ["biceps", "triceps", "forearms"] },
  { id: "legs", label: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves"] },
  { id: "core", label: "Core", muscles: ["abs"] },
  { id: "cardio", label: "Cardio", muscles: ["cardiovascular system"] },
  { id: "neck", label: "Neck", muscles: ["neck"] },
];

export const EQUIPMENT = [
  "ab wheel",
  "assisted",
  "barbell",
  "bodyweight",
  "bosu ball",
  "cable",
  "dumbbell",
  "elliptical machine",
  "EZ bar",
  "hammer",
  "kettlebell",
  "leverage machine",
  "medicine ball",
  "olympic barbell",
  "resistance band",
  "roller",
  "rope",
  "ski ergometer",
  "sled machine",
  "smith machine",
  "stability ball",
  "stationary bike",
  "stepmill machine",
  "suspension trainer",
  "tennis ball",
  "tire",
  "towel",
  "trap bar",
  "upper body ergometer",
  "weighted",
];

export const groupLabel = (id) => GROUPS.find((group) => group.id === id)?.label || "Other";

export const titleCase = (text = "") => text.replace(/\b\w/g, (char) => char.toUpperCase());

let request;

export function loadExercises() {
  if (!request) {
    request = import("./exercisedb.json")
      .then((mod) => mod.default)
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
