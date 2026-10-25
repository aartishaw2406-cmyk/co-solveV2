import { lazy, Suspense, useState } from "react";
import LandingNav from "../components/landing/LandingNav";
import Hero from "../components/landing/Hero";
import RolesSection from "../components/landing/RolesSection";
import Explore from "../components/landing/Explore";
import CtaFooter from "../components/landing/CtaFooter";
import ModeModal from "../components/landing/ModeModal";
import LoginModal from "../components/landing/LoginModal";

// three.js is large, so it loads in its own chunk and only on this page.
const ScrollScene = lazy(() => import("../components/three/ScrollScene"));

export default function Landing() {
  const [modal, setModal] = useState(null); // null | "mode" | "login"

  const openMode = () => setModal("mode");
  const openLogin = () => setModal("login");
  const closeModal = () => setModal(null);

  return (
    <div className="relative min-h-screen">
      <Suspense fallback={null}>
        <ScrollScene />
      </Suspense>

      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#1E40AF]"
        >
          Skip to main content
        </a>
        <LandingNav onGetStarted={openMode} onLogin={openLogin} />
        <main id="main">
          <Hero onGetStarted={openMode} />
          <RolesSection />
          <Explore onSolve={openMode} />
        </main>
        <CtaFooter onGetStarted={openMode} onLogin={openLogin} />
      </div>

      {modal === "mode" && <ModeModal onClose={closeModal} onSwitchToLogin={openLogin} />}
      {modal === "login" && <LoginModal onClose={closeModal} onSwitchToMode={openMode} />}
    </div>
  );
}
