import { ROLES } from "../../data/mockData";

export default function DashboardHeader({ role, onNavigate }) {
  const { label, greeting, cta } = ROLES[role];
  const CtaIcon = cta.icon;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2563EB]">{label} dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1F2937]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#4B5563]">{greeting}</p>
      </div>
      <button
        type="button"
        onClick={() => onNavigate?.(cta.label)}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
      >
        <CtaIcon className="h-4 w-4" aria-hidden="true" />
        {cta.label}
      </button>
    </div>
  );
}
