import { useEffect, useState } from "react";
import { Flag, Mic, X } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { FLAG_HIDE_AT, toggleFlag, useProblems } from "../../lib/problemsStore";

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 p-4" role="dialog" aria-modal="true" aria-label="Photo preview" onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close photo" autoFocus className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <X className="h-6 w-6" />
      </button>
      <img src={src} alt="Problem photo, enlarged" className="max-h-full max-w-full rounded-lg" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

function ReportCard({ p, onOpenPhoto }) {
  const useless = p.useless;
  return (
    <li className={`rounded-xl border bg-white p-4 shadow-sm ${useless ? "border-[#E5E7EB] opacity-70" : "border-[#E5E7EB]"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-[#1F2937]">{p.title}</p>
          <p className="mt-0.5 text-xs text-[#4B5563]">
            {p.id} · {p.location} · {p.category} · {p.updated}
            {p.mine && <span className="ml-1 font-semibold text-[#1E40AF]">· Yours</span>}
          </p>
        </div>
        {useless ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] px-2.5 py-1 text-xs font-semibold text-[#4B5563]">
            <Flag className="h-3 w-3" aria-hidden="true" />
            Flagged as useless
          </span>
        ) : (
          <StatusBadge status={p.status} />
        )}
      </div>

      {p.description && <p className="mt-3 text-sm text-[#4B5563]">{p.description}</p>}

      {p.photos?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.photos.map((src, i) => (
            <li key={i}>
              <button type="button" onClick={() => onOpenPhoto(src)} className="block overflow-hidden rounded-lg border border-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]">
                <img src={src} alt={`Photo ${i + 1} for ${p.id}, click to enlarge`} className="h-20 w-20 object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {p.voice && (
        <div className="mt-3 flex items-center gap-2">
          <Mic className="h-4 w-4 shrink-0 text-[#4B5563]" aria-hidden="true" />
          <audio controls src={p.voice.url} className="h-9 w-full max-w-sm" aria-label={`Voice note for ${p.id}`} />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-3">
        <p className="text-xs text-[#4B5563]">
          {p.flags > 0 ? `${p.flags} flagged as useless` : "Not flagged"}
          {!useless && p.flags > 0 && ` · hidden at ${FLAG_HIDE_AT}`}
        </p>
        {p.mine ? (
          <span className="text-xs text-[#9CA3AF]">You can't flag your own report</span>
        ) : (
          <button
            type="button"
            onClick={() => toggleFlag(p.id)}
            aria-pressed={p.flaggedByMe}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
              p.flaggedByMe
                ? "border-[#EF4444] bg-[#FEF2F2] text-[#EF4444]"
                : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#EF4444] hover:text-[#EF4444]"
            }`}
          >
            <Flag className="h-3.5 w-3.5" aria-hidden="true" />
            {p.flaggedByMe ? "Flagged · undo" : "Flag as useless"}
          </button>
        )}
      </div>
    </li>
  );
}

export default function ReportedFeed() {
  const problems = useProblems();
  const [showUseless, setShowUseless] = useState(false);
  const [photo, setPhoto] = useState(null);

  const useful = problems.filter((p) => !p.useless);
  const useless = problems.filter((p) => p.useless);

  return (
    <section aria-labelledby="feed-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="feed-heading" className="text-base font-semibold text-[#1F2937]">
          Community reports
        </h2>
        {useless.length > 0 && (
          <button
            type="button"
            onClick={() => setShowUseless((s) => !s)}
            aria-pressed={showUseless}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:border-[#1E40AF] hover:text-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
          >
            <Flag className="h-3.5 w-3.5" aria-hidden="true" />
            {showUseless ? "Hide" : "Show"} useless ({useless.length})
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {useful.map((p) => (
          <ReportCard key={p.id} p={p} onOpenPhoto={setPhoto} />
        ))}
      </ul>

      {showUseless && (
        <div className="space-y-3">
          <p className="text-sm text-[#4B5563]">
            These were flagged by {FLAG_HIDE_AT}+ people. They are hidden from solvers and funders.
          </p>
          <ul className="space-y-3">
            {useless.map((p) => (
              <ReportCard key={p.id} p={p} onOpenPhoto={setPhoto} />
            ))}
          </ul>
        </div>
      )}

      {photo && <Lightbox src={photo} onClose={() => setPhoto(null)} />}
    </section>
  );
}
