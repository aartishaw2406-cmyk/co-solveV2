export default function LandingNav({ onGetStarted, onLogin }) {
  return (
    <header className="sticky top-0 z-30 bg-[#1E40AF] text-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#1E40AF]">
            C
          </span>
          <span className="text-lg font-bold tracking-tight">Co-solve</span>
        </a>

        <nav aria-label="Main" className="ml-6 hidden items-center gap-6 text-sm font-medium md:flex">
          <a
            href="#how"
            className="rounded hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            How it works
          </a>
          <a
            href="#explore"
            className="rounded hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Explore problems
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onLogin}
            className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1E40AF] hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E40AF]"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
