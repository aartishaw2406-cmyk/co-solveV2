import { Building2, FilePlus2, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../ui/Modal";
import { startRole } from "../../lib/session";

const MODES = [
  {
    role: "provider",
    icon: FilePlus2,
    title: "Problem Provider",
    text: "Report problems you see around you and track them to resolution.",
  },
  {
    role: "solver",
    icon: Lightbulb,
    title: "Problem Solver",
    text: "Solve real problems as a student, build proof of work and get hired.",
  },
  {
    role: "organization",
    icon: Building2,
    title: "Organization",
    text: "Fund problems that matter and hire students based on their skills.",
  },
];

export default function ModeModal({ onClose, onSwitchToLogin }) {
  const navigate = useNavigate();

  const choose = (role) => {
    startRole(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <Modal
      title="How do you want to use Co-solve?"
      description="Choose a mode. Each one opens its own dashboard."
      onClose={onClose}
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {MODES.map(({ role, icon: Icon, title, text }) => (
          <button
            key={role}
            type="button"
            onClick={() => choose(role)}
            className="flex flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 text-left hover:border-[#1E40AF] hover:bg-[#FAFAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#1E40AF]">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-4 text-base font-semibold text-[#1F2937]">{title}</span>
            <span className="mt-1 text-sm text-[#4B5563]">{text}</span>
            <span className="mt-4 text-sm font-semibold text-[#1E40AF]">Open dashboard →</span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-[#4B5563]">
        Been here before?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="rounded font-medium text-[#0284C7] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
        >
          Log in
        </button>{" "}
        to pick up where you left off.
      </p>
    </Modal>
  );
}
