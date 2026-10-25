import { Building2, FilePlus2, Lightbulb } from "lucide-react";
import Reveal from "../ui/Reveal";

const ROLE_CARDS = [
  {
    step: "01",
    icon: FilePlus2,
    title: "Problem Provider",
    text: "See something broken around you? Report it with details and follow it until it is resolved.",
  },
  {
    step: "02",
    icon: Lightbulb,
    title: "Problem Solver",
    text: "Students pick problems that match their skills, submit solutions and build a portfolio of real work.",
  },
  {
    step: "03",
    icon: Building2,
    title: "Organization",
    text: "Fund the problems you care about and hire students whose solved problems prove their skills.",
  },
];

export default function RolesSection() {
  return (
    <section id="how" aria-labelledby="how-heading" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-[#1F2937]">
            One platform, three roles
          </h2>
          <p className="mt-2 max-w-2xl text-[#4B5563]">
            Every real-world problem moves from the person who sees it, to the student who solves it, to the
            organization that backs it.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ROLE_CARDS.map(({ step, icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="h-full rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#1E40AF]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-[#4B5563]">{step}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#1F2937]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
