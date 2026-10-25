import { useState } from "react";
import StatusBadge from "../ui/StatusBadge";
import { useProblems } from "../../lib/problemsStore";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "progress", label: "In Progress" },
  { key: "new", label: "New" },
  { key: "resolved", label: "Resolved" },
];

export default function ProblemTable({ title }) {
  const [filter, setFilter] = useState("all");
  // Problems the community flagged as useless are kept out of the list.
  const problems = useProblems().filter((p) => !p.useless);
  const rows = filter === "all" ? problems : problems.filter((p) => p.status === filter);

  return (
    <section
      aria-labelledby="problems-heading"
      className="rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-sm"
    >
      <div className="flex flex-col gap-3 border-b border-[#E5E7EB] p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="problems-heading" className="text-base font-semibold text-[#1F2937]">
          {title}
        </h2>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-full border px-3 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] ${
                filter === f.key
                  ? "border-[#1E40AF] bg-[#1E40AF] text-white"
                  : "border-[#E5E7EB] bg-[#FFFFFF] text-[#4B5563] hover:border-[#1E40AF] hover:text-[#1E40AF]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] text-xs uppercase tracking-wide text-[#4B5563]">
              <th scope="col" className="px-5 py-3 font-semibold">Problem</th>
              <th scope="col" className="px-5 py-3 font-semibold">Category</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 font-semibold">Funding</th>
              <th scope="col" className="px-5 py-3 font-semibold">Updated</th>
              <th scope="col" className="px-5 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-[#FAFAFB]">
                <td className="px-5 py-4">
                  <p className="font-medium text-[#1F2937]">{p.title}</p>
                  <p className="mt-0.5 text-xs text-[#4B5563]">
                    {p.id} · {p.location}
                  </p>
                </td>
                <td className="px-5 py-4 text-[#4B5563]">{p.category}</td>
                <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                <td className="px-5 py-4 font-medium text-[#1F2937]">{p.funding}</td>
                <td className="whitespace-nowrap px-5 py-4 text-[#4B5563]">{p.updated}</td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={`#${p.id}`}
                    className="rounded font-medium text-[#0284C7] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
                  >
                    View<span className="sr-only"> {p.id}</span>
                  </a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[#4B5563]">
                  No problems with this status yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
