import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ navItems, active, onSelect, children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#1E40AF]"
      >
        Skip to main content
      </a>
      <Topbar onMenuClick={() => setMenuOpen(true)} />
      <div className="flex">
        <Sidebar
          items={navItems}
          active={active}
          onSelect={onSelect}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
        <main id="main" className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
