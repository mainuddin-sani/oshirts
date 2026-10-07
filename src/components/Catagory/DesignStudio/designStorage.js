import { VIEWS, createGarment } from "./designStudioData";

/* Design persistence. Currently localStorage only; when the backend API is
   ready, replace these two functions (the studio calls nothing else). */

const storageKeyFor = (designKey) => `ooshirts:design:${designKey || "default"}`;

export const emptyByView = () => Object.fromEntries(VIEWS.map((view) => [view.id, []]));

/** Returns { garment, designByView } or null when nothing (valid) is saved. */
export function loadDesign(designKey) {
  try {
    const data = JSON.parse(window.localStorage.getItem(storageKeyFor(designKey)));
    if (!data) return null;
    return { garment: createGarment(data.garment), designByView: { ...emptyByView(), ...data.designByView } };
  } catch {
    return null; // unreadable or unavailable storage
  }
}

/** Throws if the design couldn't be stored (e.g. storage full). */
export function saveDesign(designKey, { garment, designByView }) {
  window.localStorage.setItem(storageKeyFor(designKey), JSON.stringify({ garment, designByView }));
}
