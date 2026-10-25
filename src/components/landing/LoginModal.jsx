import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { ROLES } from "../../data/mockData";
import { getSession, saveSession } from "../../lib/session";

const inputClass =
  "w-full rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2.5 text-sm text-[#1F2937] placeholder:text-[#4B5563] focus:border-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30";

export default function LoginModal({ onClose, onSwitchToMode }) {
  const navigate = useNavigate();
  const [noProgress, setNoProgress] = useState(false);

  const saved = getSession();
  const savedRole = saved?.role && ROLES[saved.role] ? saved.role : null;
  const savedPage = savedRole ? saved.pages?.[savedRole] : null;

  // Demo login: any email/password works. Swap in real authentication here.
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    const session = saveSession({ email });

    if (session?.role && ROLES[session.role]) {
      navigate(`/dashboard/${session.role}`);
    } else {
      setNoProgress(true);
    }
  };

  return (
    <Modal
      title="Welcome back"
      description="Log in to continue where you left off."
      onClose={onClose}
      maxWidth="max-w-md"
    >
      {savedRole && (
        <p className="mb-5 rounded-lg border border-[#E5E7EB] bg-[#FAFAFB] px-3 py-2.5 text-sm text-[#4B5563]">
          Last session: <span className="font-semibold text-[#1F2937]">{ROLES[savedRole].label}</span>
          {savedPage ? <> · {savedPage}</> : null}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-[#1F2937]">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            defaultValue={saved?.email ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-[#1F2937]">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </div>

        {noProgress && (
          <p role="status" className="rounded-lg bg-[#EFF6FF] px-3 py-2.5 text-sm text-[#2563EB]">
            No saved progress found yet.{" "}
            <button
              type="button"
              onClick={onSwitchToMode}
              className="rounded font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
            >
              Choose a mode to get started
            </button>
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
        >
          {savedRole ? "Log in and resume" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-sm text-[#4B5563]">
        New here?{" "}
        <button
          type="button"
          onClick={onSwitchToMode}
          className="rounded font-medium text-[#0284C7] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
        >
          Get started
        </button>
      </p>
    </Modal>
  );
}
