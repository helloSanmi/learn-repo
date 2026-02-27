const KEY = "star_dash_runs_v1";

export function loadRuns() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRun(run) {
  const list = loadRuns();
  const next = [{ ...run, at: Date.now() }, ...list].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function topRuns(runs) {
  return [...runs].sort((a, b) => b.score - a.score).slice(0, 5);
}
