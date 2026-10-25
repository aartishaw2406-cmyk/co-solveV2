// Tiny shared store for problems, flags and user reports.
// Persists to localStorage when possible (best effort - media can exceed the quota,
// in which case reports are kept for this session and saved without photos / voice).
// Replace with real API calls + file storage when a backend exists.
import { useSyncExternalStore } from "react";
import { PROBLEMS } from "../data/mockData";

const KEY = "cosolve_reports";
export const FLAG_HIDE_AT = 3; // flags before a problem is treated as "useless" and collapsed

// Example reports that the community has already flagged as useless.
const SEED_USELESS = [
  {
    id: "CS-1051",
    title: "Test test please ignore",
    description: "asdfgh testing the form",
    location: "—",
    category: "Other",
    status: "new",
    funding: "—",
    updated: "3 days ago",
    photos: [],
    voice: null,
    seedFlags: 5,
  },
  {
    id: "CS-1050",
    title: "My neighbour's dog barks sometimes",
    description: "It barks. Someone should build an app to stop dogs.",
    location: "Sector 4",
    category: "Other",
    status: "new",
    funding: "—",
    updated: "5 days ago",
    photos: [],
    voice: null,
    seedFlags: 4,
  },
];

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { mine: [], myFlags: {} };
}

let state = load();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded: retry without heavy media so the text report is not lost.
    try {
      const light = {
        ...state,
        mine: state.mine.map((r) => ({ ...r, photos: [], voice: null })),
      };
      localStorage.setItem(KEY, JSON.stringify(light));
    } catch {
      /* storage unavailable - session only */
    }
  }
}

function set(next) {
  state = next;
  persist();
  listeners.forEach((l) => l());
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => state;

function build(s) {
  const base = PROBLEMS.map((p) => ({ ...p, photos: [], voice: null, seedFlags: 0 }));
  const all = [...s.mine.map((m) => ({ ...m, mine: true, seedFlags: 0 })), ...base, ...SEED_USELESS];
  return all.map((p) => {
    const flaggedByMe = !!s.myFlags[p.id];
    const flags = p.seedFlags + (flaggedByMe ? 1 : 0);
    return { ...p, flags, flaggedByMe, useless: flags >= FLAG_HIDE_AT };
  });
}

let cache = { src: null, value: [] };
function getProblems() {
  if (cache.src !== state) cache = { src: state, value: build(state) };
  return cache.value;
}

export function useProblems() {
  useSyncExternalStore(subscribe, getSnapshot);
  return getProblems();
}

export function addProblem({ title, description, category, location, photos, voice }) {
  const nums = [...PROBLEMS, ...SEED_USELESS, ...state.mine].map((p) => parseInt(p.id.split("-")[1], 10));
  const id = `CS-${Math.max(...nums) + 1}`;
  const problem = {
    id,
    title,
    description,
    category,
    location,
    status: "new",
    funding: "—",
    updated: "Just now",
    photos,
    voice,
  };
  set({ ...state, mine: [problem, ...state.mine] });
  return problem;
}

export function toggleFlag(id) {
  const myFlags = { ...state.myFlags };
  if (myFlags[id]) delete myFlags[id];
  else myFlags[id] = true;
  set({ ...state, myFlags });
}
