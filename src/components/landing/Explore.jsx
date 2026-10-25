import { useState } from "react";
import { MapPin } from "lucide-react";
import Reveal from "../ui/Reveal";
import AvailabilityBadge from "../ui/AvailabilityBadge";
import { EXPLORE_PROBLEMS } from "../../data/exploreData";

const availableCount = EXPLORE_PROBLEMS.filter((p) => p.status === "available").length;
const takenCount = EXPLORE_PROBLEMS.length - availableCount;

const FILTERS = [
  { key: "all", label: "All", count: EXPLORE_PROBLEMS.length },
  { key: "available", label: "Available", count: availableCount },
  { key: "taken", label: "Taken", count: takenCount },
];

export default function Explore({ onSolve }) {
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? EXPLORE_PROBLEMS : EXPLORE_PROBLEMS.filter((p) => p.status === filter);

  return (
    <section
      id="explore"
      aria-labelledby="explore-heading"
      className="scroll-mt-20 bg-[#FAFAFB]/80 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="explore-heading" className="text-3xl font-bold tracking-tight text-[#1F2937]">
                Explore real-world problems
              </h2>
              <p className="mt-2 max-w-2xl text-[#4B5563]">
                Problems reported by people across the country. Green means a solver is still needed; red means a
                student or team has already taken it.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter problems by availability">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                    filter === f.key
                      ? "border-[#1E40AF] bg-[#1E40AF] text-white"
                      : "border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:border-[#1E40AF] hover:text-[#1E40AF]"
                  }`}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={(i % 4) * 80} className="h-full">
                <article className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[#4B5563]">{p.category}</span>
                    <AvailabilityBadge status={p.status} />
                  </div>

                  <h3 className="mt-3 text-base font-semibold leading-snug text-[#1F2937]">{p.title}</h3>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#4B5563]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {p.location}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[#E5E7EB] bg-[#FAFAFB] px-2 py-0.5 text-xs text-[#4B5563]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#E5E7EB] pt-4">
                    <div>
                      <p className="text-xs text-[#4B5563]">Funding</p>
                      <p className="text-sm font-semibold text-[#1F2937]">{p.funding}</p>
                    </div>
                    {p.status === "available" ? (
                      <button
                        type="button"
                        onClick={onSolve}
                        className="rounded-lg bg-[#1E40AF] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
                      >
                        Solve this<span className="sr-only">: {p.title}</span>
                      </button>
                    ) : (
                      <p className="text-right text-xs text-[#4B5563]">Taken by {p.solver}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
