import { ROLES } from "../../data/mockData";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ProblemTable from "../../components/dashboard/ProblemTable";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import { ResolutionProgress } from "../../components/dashboard/Panels";

export default function ProviderDashboard({ onNavigate }) {
  const config = ROLES.provider;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardHeader role="provider" onNavigate={onNavigate} />
      <StatsGrid stats={config.stats} />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ProblemTable title={config.tableTitle} />
        </div>
        <div className="space-y-6">
          <ResolutionProgress />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
