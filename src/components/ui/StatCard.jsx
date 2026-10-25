const TONES = {
  critical: "bg-[#FEF2F2] text-[#EF4444]",
  progress: "bg-[#FEF3C7] text-[#D97706]",
  new: "bg-[#EFF6FF] text-[#2563EB]",
  success: "bg-[#ECFDF5] text-[#059669]",
};

export default function StatCard({ label, value, hint, tone = "new", icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-[#4B5563]">{label}</p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${TONES[tone]}`}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[#1F2937]">{value}</p>
      <p className="mt-1 text-xs text-[#4B5563]">{hint}</p>
    </div>
  );
}
