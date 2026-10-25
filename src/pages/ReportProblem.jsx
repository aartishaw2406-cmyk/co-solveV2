import ReportForm from "../components/report/ReportForm";
import ReportedFeed from "../components/report/ReportedFeed";

export default function ReportProblem() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">Report a Problem</h1>
        <p className="mt-1 text-sm text-[#4B5563]">
          Add photos and a voice note so solvers understand the problem on the ground.
        </p>
      </div>
      <ReportForm />
      <ReportedFeed />
    </div>
  );
}
