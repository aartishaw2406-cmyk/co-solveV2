// Semantic status tokens from the Co-solve design system.
// Keys are used by <StatusBadge /> and <StatCard />.
export const STATUS = {
  critical: {
    label: "Critical",
    dot: "bg-[#EF4444]",
    text: "text-[#EF4444]",
    badge: "bg-[#FEF2F2]",
  },
  progress: {
    label: "In Progress",
    dot: "bg-[#F59E0B]",
    text: "text-[#D97706]",
    badge: "bg-[#FEF3C7]",
  },
  new: {
    label: "New",
    dot: "bg-[#3B82F6]",
    text: "text-[#2563EB]",
    badge: "bg-[#EFF6FF]",
  },
  resolved: {
    label: "Resolved",
    dot: "bg-[#10B981]",
    text: "text-[#059669]",
    badge: "bg-[#ECFDF5]",
  },
};
