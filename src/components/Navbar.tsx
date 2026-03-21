import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_ITEMS } from "@/components/shared";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <button onClick={() => setActiveSection("home")} className="flex items-center gap-2">
          <div
            className="w-8 h-8 flex items-center justify-center clip-corner-sm"
            style={{ background: "linear-gradient(135deg, #00ffff, #0088ff)", boxShadow: "0 0 15px rgba(0,255,255,0.5)" }}
          >
            <Icon name="Cpu" size={16} className="text-black" />
          </div>
          <span className="font-rajdhani text-xl font-bold tracking-wider" style={{ color: "#00ffff", textShadow: "0 0 10px rgba(0,255,255,0.6)" }}>
            NEX<span className="text-white">GEN</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="relative px-4 py-2 font-ibm text-sm transition-all duration-200"
              style={{
                color: activeSection === item.id ? "#00ffff" : "rgba(255,255,255,0.5)",
                textShadow: activeSection === item.id ? "0 0 10px rgba(0,255,255,0.6)" : "none",
              }}
            >
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-2 right-2 h-px" style={{ background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />
              )}
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            className="font-ibm text-sm px-4 py-1.5 border transition-all duration-200 hover:bg-white/5"
            style={{ borderColor: "rgba(0,255,255,0.3)", color: "#00ffff" }}
          >
            Войти
          </button>
          <button
            onClick={() => setActiveSection("editor")}
            className="font-ibm text-sm px-4 py-1.5 clip-corner-sm font-medium transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #00ffff, #0088ff)", color: "#000", boxShadow: "0 0 15px rgba(0,255,255,0.3)" }}
          >
            Создать игру
          </button>
        </div>

        <button className="md:hidden text-white/60" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2.5 font-ibm text-sm"
              style={{ color: activeSection === item.id ? "#00ffff" : "rgba(255,255,255,0.6)" }}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-3 flex gap-2">
            <button className="flex-1 py-2 text-sm border font-ibm" style={{ borderColor: "rgba(0,255,255,0.3)", color: "#00ffff" }}>
              Войти
            </button>
            <button
              className="flex-1 py-2 text-sm font-ibm font-medium"
              onClick={() => { setActiveSection("editor"); setMobileMenuOpen(false); }}
              style={{ background: "linear-gradient(135deg, #00ffff, #0088ff)", color: "#000" }}
            >
              Создать игру
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
