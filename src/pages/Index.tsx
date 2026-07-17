import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SectionHome from "@/components/SectionHome";
import SectionEditor from "@/components/SectionEditor";
import SectionGallery from "@/components/SectionGallery";
import SectionDocs from "@/components/SectionDocs";
import SectionCommunity from "@/components/SectionCommunity";
import SectionFaq from "@/components/SectionFaq";
import AuthModal from "@/components/AuthModal";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function AppContent() {
  const [activeSection, setActiveSection] = useState("home");
  const [authModal, setAuthModal] = useState<{ open: boolean; tab: "login" | "register" }>({ open: false, tab: "login" });
  const { user, oauthError } = useAuth();

  const openAuth = (tab: "login" | "register" = "login") => {
    setAuthModal({ open: true, tab });
  };

  useEffect(() => {
    if (user) setAuthModal((m) => ({ ...m, open: false }));
  }, [user]);

  useEffect(() => {
    if (oauthError) setAuthModal({ open: true, tab: "login" });
  }, [oauthError]);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Ambient orbs */}
      <div
        className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #00ffff22, transparent 70%)" }}
      />
      <div
        className="fixed bottom-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #ff00ff22, transparent 70%)" }}
      />

      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} onAuthOpen={openAuth} />

      <main className="pt-16">
        {activeSection === "home" && <SectionHome setActiveSection={setActiveSection} />}
        {activeSection === "editor" && <SectionEditor onAuthOpen={openAuth} />}
        {activeSection === "gallery" && <SectionGallery onAuthOpen={openAuth} />}
        {activeSection === "docs" && <SectionDocs />}
        {activeSection === "community" && <SectionCommunity />}
        {activeSection === "faq" && <SectionFaq />}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t py-8" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-rajdhani font-bold" style={{ color: "#00ffff" }}>NEXGEN</span>
            <span className="font-mono text-xs text-white/20">© 2026</span>
          </div>
          <div className="flex gap-6">
            {["Условия", "Конфиденциальность", "Контакты"].map((l) => (
              <button key={l} className="font-ibm text-xs text-white/25 hover:text-white/50 transition-colors">{l}</button>
            ))}
          </div>
          <div className="font-mono text-xs text-white/20">
            Powered by NexGen AI Engine
          </div>
        </div>
      </footer>

      {authModal.open && (
        <AuthModal
          defaultTab={authModal.tab}
          onClose={() => setAuthModal({ ...authModal, open: false })}
        />
      )}
    </div>
  );
}

export default function Index() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}