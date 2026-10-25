const AVAILABILITY = {
  available: {
    label: "Available",
    dot: "bg-[#10B981]",
    text: "text-[#059669]",
    badge: "bg-[#ECFDF5]",
  },
  taken: {
    label: "Taken",
    dot: "bg-[#EF4444]",
    text: "text-[#EF4444]",
    badge: "bg-[#FEF2F2]",
  },
};

export default function AvailabilityBadge({ status }) {
  const s = AVAILABILITY[status];
  if (!s) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.badge} ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden="true" />
      {s.label}
    </span>
  );
}
