export default function CtaFooter({ onGetStarted, onLogin }) {
  return (
    <footer className="pb-10 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Banner onGetStarted={onGetStarted} onLogin={onLogin} />
        <p className="mt-8 text-center text-sm text-[#4B5563]">
          © {new Date().getFullYear()} Co-solve. Real problems, solved together.
        </p>
      </div>
    </footer>
  );
}

function Banner({ onGetStarted, onLogin }) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="rounded-2xl bg-[#1E40AF] px-6 py-12 text-center text-white sm:px-12"
    >
      <h2 id="cta-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
        Ready to solve something real?
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-white/90">
        Pick your role and jump in, or log in to continue right where you left off.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onGetStarted}
          className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#1E40AF] hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E40AF]"
        >
          Get started
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="rounded-lg border border-white/50 px-6 py-3 text-base font-semibold text-white hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1E40AF]"
        >
          Log in
        </button>
      </div>
    </section>
  );
}
