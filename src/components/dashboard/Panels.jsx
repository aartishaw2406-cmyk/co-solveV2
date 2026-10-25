import { RECOMMENDED, TOP_SOLVERS, STATUS_BREAKDOWN } from "../../data/mockData";
import { STATUS } from "../../constants/theme";

const cardClass = "rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm";

function SkillChip({ children }) {
  return (
    <span className="rounded-md border border-[#E5E7EB] bg-[#FAFAFB] px-2 py-0.5 text-xs text-[#4B5563]">
      {children}
    </span>
  );
}

// Problem Provider: status breakdown bars
export function ResolutionProgress() {
  const total = STATUS_BREAKDOWN.reduce((sum, s) => sum + s.count, 0);
  return (
    <section aria-labelledby="panel-heading" className={cardClass}>
      <h2 id="panel-heading" className="text-base font-semibold text-[#1F2937]">
        Resolution progress
      </h2>
      <ul className="mt-4 space-y-3">
        {STATUS_BREAKDOWN.map(({ key, count }) => (
          <li key={key}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-[#4B5563]">{STATUS[key].label}</span>
              <span className="font-semibold text-[#1F2937]">{count}</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]"
              role="progressbar"
              aria-valuenow={count}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${STATUS[key].label} problems`}
            >
              <div
                className={`h-full rounded-full ${STATUS[key].dot}`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Problem Solver: problems matched to their skills
export function RecommendedProblems() {
  return (
    <section aria-labelledby="panel-heading" className={cardClass}>
      <h2 id="panel-heading" className="text-base font-semibold text-[#1F2937]">
        Recommended for your skills
      </h2>
      <ul className="mt-4 space-y-4">
        {RECOMMENDED.map((r) => (
          <li key={r.id} className="border-b border-[#E5E7EB] pb-4 last:border-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-[#1F2937]">{r.title}</p>
              <span className="shrink-0 rounded-full bg-[#ECFDF5] px-2 py-0.5 text-xs font-semibold text-[#059669]">
                {r.match}% match
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.skills.map((s) => (
                <SkillChip key={s}>{s}</SkillChip>
              ))}
            </div>
            <a
              href={`#${r.id}`}
              className="mt-2 inline-block rounded text-sm font-medium text-[#0284C7] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
            >
              Start solving
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Organization: top students to hire
export function TopSolvers() {
  return (
    <section aria-labelledby="panel-heading" className={cardClass}>
      <h2 id="panel-heading" className="text-base font-semibold text-[#1F2937]">
        Top solvers to hire
      </h2>
      <ul className="mt-4 space-y-4">
        {TOP_SOLVERS.map((s) => (
          <li key={s.name} className="border-b border-[#E5E7EB] pb-4 last:border-0 last:pb-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#1F2937]">{s.name}</p>
                <p className="text-xs text-[#4B5563]">
                  {s.college} · {s.solved} problems solved
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg bg-[#1E40AF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
              >
                Invite<span className="sr-only"> {s.name}</span>
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {s.skills.map((sk) => (
                <SkillChip key={sk}>{sk}</SkillChip>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
