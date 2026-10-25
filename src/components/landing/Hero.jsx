import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero({ onGetStarted }) {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative flex min-h-[88vh] items-center">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#2563EB]">
          Report · Solve · Fund · Hire
        </p>
        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#1F2937] sm:text-6xl"
        >
          Real problems around you. <span className="text-[#1E40AF]">Real students</span> solving them.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#4B5563]">
          Co-solve connects people who face everyday problems, students who want to prove their skills,
          and organizations ready to fund solutions and hire talent.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1E40AF] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
          >
            Get started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <a
            href="#explore"
            className="rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] px-6 py-3 text-base font-semibold text-[#1F2937] hover:border-[#1E40AF] hover:text-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF] focus-visible:ring-offset-2"
          >
            Explore problems
          </a>
        </div>

        <a
          href="#how"
          className="mt-16 inline-flex items-center gap-2 rounded text-sm text-[#4B5563] hover:text-[#1E40AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
        >
          Scroll to see how it connects
          <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
