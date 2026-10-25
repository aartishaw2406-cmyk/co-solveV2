import StatCard from "../ui/StatCard";

export default function StatsGrid({ stats }) {
  return (
    <section aria-label="Summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </section>
  );
}
