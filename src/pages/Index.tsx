import { useState } from "react";
import Navbar from "@/components/Navbar";
import SectionHome from "@/components/SectionHome";
import SectionEditor from "@/components/SectionEditor";
import SectionGallery from "@/components/SectionGallery";
import SectionDocs from "@/components/SectionDocs";
import SectionCommunity from "@/components/SectionCommunity";
import SectionFaq from "@/components/SectionFaq";

const GENERATED_CODE_TEMPLATE = (prompt: string) => `// 🎮 Игра: "${prompt}"
// Сгенерировано NexGen AI

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 60;
    this.speed = 5;
    this.color = '#00ffff';
  }
  
  update(keys) {
    if (keys['ArrowLeft']) this.x -= this.speed;
    if (keys['ArrowRight']) this.x += this.speed;
  }
  
  draw() {
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - 15, this.y - 15, 30, 30);
  }
}

// Инициализация игры...
const player = new Player();
const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update(keys);
  player.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();`;

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [editorPrompt, setEditorPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleGenerate = () => {
    if (!editorPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedCode("");
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedCode(GENERATED_CODE_TEMPLATE(editorPrompt));
    }, 2200);
  };

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

      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="pt-16">
        {activeSection === "home" && <SectionHome setActiveSection={setActiveSection} />}
        {activeSection === "editor" && (
          <SectionEditor
            editorPrompt={editorPrompt}
            setEditorPrompt={setEditorPrompt}
            isGenerating={isGenerating}
            generatedCode={generatedCode}
            handleGenerate={handleGenerate}
          />
        )}
        {activeSection === "gallery" && <SectionGallery />}
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
    </div>
  );
}
