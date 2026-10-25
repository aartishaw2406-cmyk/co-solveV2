// Front-end only "session" so people can resume where they left off.
// It lives in this browser's localStorage. Replace with real auth + a backend
// (e.g. save lastRole / lastPage on the user record) for cross-device resume.

const KEY = "cosolve_session";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode etc.) - app still works, just no resume
  }
  return value;
}

export function getSession() {
  return read();
}

export function saveSession(patch) {
  return write({ ...(read() ?? {}), ...patch, updatedAt: Date.now() });
}

// "Get started": begin a fresh visit in the chosen mode.
export function startRole(role) {
  const s = read() ?? {};
  return write({
    ...s,
    role,
    pages: { ...(s.pages ?? {}), [role]: "Dashboard" },
    updatedAt: Date.now(),
  });
}

// Called by the dashboard whenever the user changes section.
export function savePage(role, page) {
  const s = read() ?? {};
  return write({
    ...s,
    role,
    pages: { ...(s.pages ?? {}), [role]: page },
    updatedAt: Date.now(),
  });
}
