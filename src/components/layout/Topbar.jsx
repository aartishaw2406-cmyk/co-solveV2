import { Bell, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-[#1E40AF] px-4 text-white shadow-sm sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="rounded-lg p-2 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link
        to="/"
        aria-label="Co-solve home"
        className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#1E40AF]">
          C
        </span>
        <span className="text-lg font-bold tracking-tight">Co-solve</span>
      </Link>

      <form role="search" className="relative ml-auto hidden max-w-md flex-1 md:block">
        <label htmlFor="global-search" className="sr-only">
          Search problems, students or organisations
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5563]"
          aria-hidden="true"
        />
        <input
          id="global-search"
          type="search"
          placeholder="Search problems, students, organisations..."
          className="w-full rounded-lg border border-transparent bg-white py-2 pl-9 pr-3 text-sm text-[#1F2937] placeholder:text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-white/70"
        />
      </form>

      <div className="ml-auto flex items-center gap-2 md:ml-4">
        <button
          type="button"
          aria-label="Notifications, 3 unread"
          className="relative rounded-lg p-2 hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#EF4444] ring-2 ring-[#1E40AF]" />
        </button>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#1E40AF]"
          title="Aarti Shaw"
        >
          AS
        </div>
      </div>
    </header>
  );
}
