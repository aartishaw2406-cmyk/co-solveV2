import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import SectionPlaceholder from "../components/dashboard/SectionPlaceholder";
import ReportProblem from "./ReportProblem";
import ProviderDashboard from "./dashboards/ProviderDashboard";
import SolverDashboard from "./dashboards/SolverDashboard";
import OrganizationDashboard from "./dashboards/OrganizationDashboard";
import { ROLES } from "../data/mockData";
import { getSession, savePage } from "../lib/session";

const HOME_PAGES = {
  provider: ProviderDashboard,
  solver: SolverDashboard,
  organization: OrganizationDashboard,
};

function DashboardShell({ role }) {
  const navItems = ROLES[role].nav;

  // Resume the section the person was last on in this mode.
  const [active, setActive] = useState(() => {
    const saved = getSession()?.pages?.[role];
    return navItems.some((n) => n.label === saved) ? saved : "Dashboard";
  });

  useEffect(() => {
    savePage(role, active);
  }, [role, active]);

  const HomePage = HOME_PAGES[role];

  return (
    <DashboardLayout navItems={navItems} active={active} onSelect={setActive}>
      {active === "Dashboard" ? (
        <HomePage onNavigate={setActive} />
      ) : role === "provider" && active === "Report a Problem" ? (
        <ReportProblem />
      ) : (
        <SectionPlaceholder title={active} />
      )}
    </DashboardLayout>
  );
}

export default function DashboardRoute() {
  const { role } = useParams();

  // Visiting a dashboard directly without choosing a mode or logging in sends you home.
  if (!ROLES[role] || !getSession()?.role) return <Navigate to="/" replace />;

  return <DashboardShell key={role} role={role} />;
}
