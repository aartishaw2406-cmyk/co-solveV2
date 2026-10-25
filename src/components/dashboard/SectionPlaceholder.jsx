import { Hammer } from "lucide-react";

// Stand-in for sidebar sections that are not built yet.
// The section is still saved, so logging in later returns the person here.
export default function SectionPlaceholder({ title }) {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">{title}</h1>
      <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-[#E5E7EB] bg-[#FFFFFF] px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1E40AF]">
          <Hammer className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-4 font-semibold text-[#1F2937]">This section is coming soon</p>
        <p className="mt-1 max-w-sm text-sm text-[#4B5563]">
          Your place here is saved. Log in later and you will land back on this page.
        </p>
      </div>
    </div>
  );
}
