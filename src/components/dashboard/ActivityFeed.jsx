import { ACTIVITY } from "../../data/mockData";
import { STATUS } from "../../constants/theme";

export default function ActivityFeed() {
  return (
    <section
      aria-labelledby="activity-heading"
      className="rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm"
    >
      <h2 id="activity-heading" className="text-base font-semibold text-[#1F2937]">
        Recent activity
      </h2>
      <ul className="mt-4 space-y-4">
        {ACTIVITY.map((a) => (
          <li key={a.id} className="flex gap-3">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STATUS[a.tone].dot}`}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm text-[#1F2937]">{a.text}</p>
              <p className="mt-0.5 text-xs text-[#4B5563]">{a.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
