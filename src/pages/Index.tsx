import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "editor", label: "Редактор" },
  { id: "gallery", label: "Галерея" },
  { id: "docs", label: "Документация" },
  { id: "community", label: "Сообщество" },
  { id: "faq", label: "FAQ" },
];

const GALLERY_GAMES = [
  { title: "Nebula Runner", genre: "Раннер", plays: "12.4K", color: "cyan", icon: "Rocket" as const },
  { title: "Void Tactics", genre: "Стратегия", plays: "8.7K", color: "magenta", icon: "Swords" as const },
  { title: "Pixel Dungeon X", genre: "RPG", plays: "21.2K", color: "lime", icon: "Skull" as const },
  { title: "Hyper Drive", genre: "Гонки", plays: "5.9K", color: "orange", icon: "Zap" as const },
  { title: "Echo Protocol", genre: "Головоломка", plays: "9.1K", color: "blue", icon: "Brain" as const },
  { title: "Cyber Farm", genre: "Симулятор", plays: "3.3K", color: "cyan", icon: "Sprout" as const },
];

const FEATURES = [
  {
    icon: "Sparkles",
    title: "ИИ-генерация кода",
    desc: "Опишите механику словами — ИИ напишет код на JavaScript автоматически",
    color: "cyan",
  },
  {
    icon: "Image",
    title: "Генерация активов",
    desc: "Персонажи, фоны, спрайты и звуки — всё создаётся нейросетью по описанию",
    color: "magenta",
  },
  {
    icon: "Cpu",
    title: "Авто-механики",
    desc: "Физика, коллизии, AI-враги, инвентарь — подключаются одним кликом",
    color: "lime",
  },
];

const DOCS = [
  { title: "Быстрый старт", desc: "Создайте первую игру за 5 минут", icon: "Play", color: "cyan" },
  { title: "ИИ-промпты", desc: "Как правильно описывать игровые механики", icon: "MessageSquare", color: "magenta" },
  { title: "Типы игр", desc: "Платформеры, RPG, стратегии, аркады", icon: "Gamepad2", color: "lime" },
  { title: "Публикация", desc: "Экспорт и публикация игры в интернет", icon: "Upload", color: "orange" },
  { title: "API активов", desc: "Интеграция с внешними библиотеками ресурсов", icon: "Link", color: "blue" },
  { title: "Монетизация", desc: "Как добавить донат и рекламу в игру", icon: "DollarSign", color: "cyan" },
];

const COMMUNITY_POSTS = [
  { user: "Starforge_Dev", avatar: "S", text: "Сделал файтинг за ночь! ИИ сгенерировал всех персонажей", likes: 142, color: "cyan" },
  { user: "PixelWitch", avatar: "P", text: "Наконец-то платформа без регистрации. Моя первая игра готова!", likes: 89, color: "magenta" },
  { user: "N3X7_Games", avatar: "N", text: "Физика в раннере работает идеально — ИИ сам настроил гравитацию", likes: 211, color: "lime" },
];

const FAQ_ITEMS = [
  {
    q: "Это действительно бесплатно?",
    a: "Да, базовый функционал полностью бесплатен без ограничений по времени. Платные планы только для расширенных функций.",
  },
  {
    q: "Нужно ли знать программирование?",
    a: "Нет. ИИ пишет весь код автоматически. Вы просто описываете, что хотите — на русском языке.",
  },
  {
    q: "Какие типы игр можно создать?",
    a: "Платформеры, раннеры, RPG, стратегии, головоломки, файтинги, симуляторы, аркады и многое другое.",
  },
  {
    q: "Можно ли опубликовать игру?",
    a: "Да, игры публикуются одним кликом. Получаете ссылку для шеринга и возможность встроить игру на свой сайт.",
  },
  {
    q: "Какой движок используется?",
    a: "Собственный WebGL-движок, оптимизированный для браузерных игр. Работает на любом устройстве без установки.",
  },
];

const neonColors: Record<string, string> = {
  cyan: "#00ffff",
  magenta: "#ff00ff",
  lime: "#00ff88",
  orange: "#ff6600",
  blue: "#0088ff",
};

function NeonLabel({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 border"
      style={{
        color: neonColors[color],
        borderColor: `${neonColors[color]}44`,
        backgroundColor: `${neonColors[color]}10`,
        textShadow: `0 0 8px ${neonColors[color]}`,
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, accent = "cyan" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8" style={{ background: neonColors[accent], boxShadow: `0 0 6px ${neonColors[accent]}` }} />
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: neonColors[accent] }}>
          NEXGEN
        </span>
        <div className="h-px flex-1" style={{ background: `${neonColors[accent]}30` }} />
      </div>
      <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-white leading-tight">{children}</h2>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [editorPrompt, setEditorPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGenerate = () => {
    if (!editorPrompt.trim()) return;
    setIsGenerating(true);
    setGeneratedCode("");
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedCode(`// 🎮 Игра: "${editorPrompt}"
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

gameLoop();`);
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

      {/* NAV */}
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

      {/* CONTENT */}
      <main className="pt-16">

        {/* ===== HOME ===== */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full py-20">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-6 animate-fade-in">
                    <NeonLabel color="lime">BETA</NeonLabel>
                    <span className="font-mono text-xs text-white/40">v0.9.1 — Бесплатно навсегда</span>
                  </div>

                  <h1 className="font-rajdhani text-6xl md:text-8xl font-bold leading-none mb-6">
                    <span className="text-white">СОЗДАВАЙ</span>
                    <br />
                    <span style={{ color: "#00ffff", textShadow: "0 0 20px rgba(0,255,255,0.6), 0 0 60px rgba(0,255,255,0.3)" }}>
                      ИГРЫ
                    </span>
                    <br />
                    <span className="text-white/30">С ПОМОЩЬЮ ИИ</span>
                  </h1>

                  <p className="font-ibm text-lg text-white/50 max-w-lg mb-10 leading-relaxed">
                    Опишите игру на русском — ИИ сгенерирует код, активы и механики.
                    Без регистрации, без ограничений, без оплаты.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setActiveSection("editor")}
                      className="group flex items-center gap-3 px-8 py-4 font-rajdhani text-lg font-bold clip-corner transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #00ffff, #0088ff)", color: "#000", boxShadow: "0 0 25px rgba(0,255,255,0.4)" }}
                    >
                      <Icon name="Sparkles" size={20} />
                      Начать создавать
                      <Icon name="ArrowRight" size={18} />
                    </button>
                    <button
                      onClick={() => setActiveSection("gallery")}
                      className="flex items-center gap-3 px-8 py-4 font-rajdhani text-lg font-semibold border transition-all duration-300 hover:bg-white/5"
                      style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
                    >
                      <Icon name="Gamepad2" size={20} />
                      Смотреть галерею
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-8 mt-16">
                    {[
                      { val: "14K+", label: "Игр создано", color: "cyan" },
                      { val: "0₽", label: "Стоимость", color: "lime" },
                      { val: "∞", label: "Ограничений", color: "magenta" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="font-rajdhani text-3xl font-bold" style={{ color: neonColors[s.color], textShadow: `0 0 15px ${neonColors[s.color]}80` }}>
                          {s.val}
                        </div>
                        <div className="font-mono text-xs text-white/30 uppercase tracking-wider mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating code preview */}
              <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
                <div
                  className="w-[380px] h-[280px] clip-corner border animate-float"
                  style={{ borderColor: "rgba(0,255,255,0.2)", background: "rgba(0,255,255,0.03)", boxShadow: "0 0 40px rgba(0,255,255,0.1)" }}
                >
                  <div className="p-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(0,255,255,0.1)" }}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#00ff8860" }} />
                    </div>
                    <span className="font-mono text-xs text-white/30">game_preview.js</span>
                  </div>
                  <div className="p-4 font-mono text-xs leading-relaxed">
                    <div className="text-white/20">{"// NexGen AI Engine v0.9"}</div>
                    <div className="mt-2">
                      <span style={{ color: "#ff00ff" }}>class </span>
                      <span style={{ color: "#00ffff" }}>Player</span>
                      <span className="text-white/50"> {"{"}</span>
                    </div>
                    <div className="ml-4">
                      <span style={{ color: "#00ff88" }}>constructor</span>
                      <span className="text-white/50">() {"{"}</span>
                    </div>
                    <div className="ml-8 text-white/40">this.x = <span style={{ color: "#ff6600" }}>canvas.width</span> / 2;</div>
                    <div className="ml-8 text-white/40">this.speed = <span style={{ color: "#ff6600" }}>5</span>;</div>
                    <div className="ml-4 text-white/50">{"}"}</div>
                    <div className="mt-2 ml-4">
                      <span style={{ color: "#00ff88" }}>update</span>
                      <span className="text-white/50">(keys) {"{"}</span>
                    </div>
                    <div className="ml-8 text-white/30">{"// ИИ-логика..."}</div>
                    <div className="ml-4 text-white/50">{"}"}</div>
                    <div className="text-white/50">{"}"}</div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                      <span className="text-white/30 text-xs">Генерация активов...</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features */}
            <section className="py-20 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-4">
                <SectionTitle accent="cyan">Возможности платформы</SectionTitle>
                <div className="grid md:grid-cols-3 gap-6">
                  {FEATURES.map((f) => (
                    <div
                      key={f.title}
                      className="p-6 border clip-corner transition-all duration-300 cursor-default"
                      style={{ borderColor: `${neonColors[f.color]}20`, background: `${neonColors[f.color]}04` }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${neonColors[f.color]}50`;
                        el.style.boxShadow = `0 0 20px ${neonColors[f.color]}15`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${neonColors[f.color]}20`;
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center clip-corner-sm mb-5"
                        style={{ background: `${neonColors[f.color]}15`, border: `1px solid ${neonColors[f.color]}30` }}
                      >
                        <Icon name={f.icon} size={22} style={{ color: neonColors[f.color], filter: `drop-shadow(0 0 6px ${neonColors[f.color]})` }} />
                      </div>
                      <h3 className="font-rajdhani text-xl font-bold text-white mb-2">{f.title}</h3>
                      <p className="font-ibm text-sm text-white/45 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4">
                <div
                  className="relative overflow-hidden clip-corner p-12 text-center border"
                  style={{ borderColor: "rgba(0,255,255,0.15)", background: "linear-gradient(135deg, rgba(0,255,255,0.04), rgba(0,136,255,0.04))" }}
                >
                  <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,255,255,0.15), transparent 70%)" }} />
                  <div className="relative">
                    <NeonLabel color="cyan">БЕСПЛАТНО</NeonLabel>
                    <h2 className="font-rajdhani text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
                      Готов создать свою игру?
                    </h2>
                    <p className="font-ibm text-white/40 mb-8 max-w-md mx-auto">
                      Без регистрации. Без кредитной карты. Без ограничений.
                    </p>
                    <button
                      onClick={() => setActiveSection("editor")}
                      className="inline-flex items-center gap-3 px-10 py-4 font-rajdhani text-xl font-bold clip-corner"
                      style={{ background: "linear-gradient(135deg, #00ffff, #ff00ff)", color: "#000", boxShadow: "0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(255,0,255,0.2)" }}
                    >
                      <Icon name="Zap" size={22} />
                      Запустить редактор
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== EDITOR ===== */}
        {activeSection === "editor" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle accent="cyan">ИИ-редактор игр</SectionTitle>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: prompt */}
              <div className="space-y-4">
                <div className="border clip-corner p-6" style={{ borderColor: "rgba(0,255,255,0.2)", background: "rgba(0,255,255,0.03)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Terminal" size={16} style={{ color: "#00ffff" }} />
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Описание игры</span>
                  </div>
                  <textarea
                    value={editorPrompt}
                    onChange={(e) => setEditorPrompt(e.target.value)}
                    placeholder="Например: 2D платформер с персонажем-роботом, который собирает кристаллы и избегает лазеров. Управление стрелками. Есть прыжок и двойной прыжок."
                    className="w-full bg-transparent text-white/80 font-ibm text-sm resize-none outline-none placeholder-white/20 leading-relaxed"
                    rows={5}
                  />
                </div>

                <div>
                  <div className="font-mono text-xs text-white/30 uppercase tracking-wider mb-3">Тип игры</div>
                  <div className="flex flex-wrap gap-2">
                    {["Платформер", "Раннер", "RPG", "Стратегия", "Головоломка", "Аркада", "Гонки"].map((type) => (
                      <button
                        key={type}
                        className="px-3 py-1.5 font-ibm text-xs border clip-corner-sm transition-all hover:bg-white/5"
                        style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
                        onClick={() => setEditorPrompt((prev) => prev ? prev + ". Жанр: " + type : type + " игра")}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !editorPrompt.trim()}
                  className="w-full py-4 font-rajdhani text-lg font-bold clip-corner flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-40"
                  style={{
                    background: editorPrompt.trim() ? "linear-gradient(135deg, #00ffff, #0088ff)" : "rgba(0,255,255,0.1)",
                    color: editorPrompt.trim() ? "#000" : "#00ffff",
                    boxShadow: editorPrompt.trim() ? "0 0 20px rgba(0,255,255,0.3)" : "none",
                  }}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "#00000060", borderTopColor: "transparent" }} />
                      ИИ генерирует...
                    </>
                  ) : (
                    <>
                      <Icon name="Sparkles" size={20} />
                      Создать игру
                    </>
                  )}
                </button>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "Code2", label: "Авто-код", color: "cyan" },
                    { icon: "Image", label: "Активы", color: "magenta" },
                    { icon: "Cpu", label: "Физика", color: "lime" },
                  ].map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col items-center gap-2 p-3 border clip-corner-sm"
                      style={{ borderColor: `${neonColors[f.color]}20`, background: `${neonColors[f.color]}05` }}
                    >
                      <Icon name={f.icon} size={18} style={{ color: neonColors[f.color] }} />
                      <span className="font-mono text-xs text-white/40">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: code output */}
              <div className="border clip-corner overflow-hidden" style={{ borderColor: "rgba(0,255,255,0.15)", background: "rgba(0,0,0,0.4)" }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(0,255,255,0.1)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: "#00ff88", boxShadow: "0 0 6px #00ff88" }} />
                    <span className="font-mono text-xs text-white/40">output.js</span>
                  </div>
                  <NeonLabel color="cyan">NEXGEN AI</NeonLabel>
                </div>
                <div className="p-6 h-[400px] overflow-auto">
                  {!generatedCode && !isGenerating && (
                    <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                      <div className="w-16 h-16 flex items-center justify-center clip-corner" style={{ border: "1px solid rgba(0,255,255,0.15)", background: "rgba(0,255,255,0.05)" }}>
                        <Icon name="Code2" size={28} style={{ color: "rgba(0,255,255,0.4)" }} />
                      </div>
                      <p className="font-ibm text-sm text-white/25">
                        Опишите игру слева и нажмите «Создать» — ИИ сгенерирует код здесь
                      </p>
                    </div>
                  )}
                  {isGenerating && (
                    <div className="h-full flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(0,255,255,0.3)", borderTopColor: "#00ffff" }} />
                      <div className="font-mono text-xs text-white/40">Нейросеть пишет код...</div>
                    </div>
                  )}
                  {generatedCode && (
                    <pre className="font-mono text-xs text-white/70 leading-relaxed whitespace-pre-wrap">{generatedCode}</pre>
                  )}
                </div>
                {generatedCode && (
                  <div className="px-4 py-3 border-t flex gap-3" style={{ borderColor: "rgba(0,255,255,0.1)" }}>
                    <button
                      className="flex-1 py-2.5 font-rajdhani font-bold text-sm clip-corner-sm flex items-center justify-center gap-2"
                      style={{ background: "linear-gradient(135deg, #00ffff, #0088ff)", color: "#000" }}
                    >
                      <Icon name="Play" size={16} />
                      Запустить
                    </button>
                    <button
                      className="flex-1 py-2.5 font-rajdhani font-semibold text-sm clip-corner-sm border flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
                      style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                    >
                      <Icon name="Download" size={16} />
                      Скачать
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== GALLERY ===== */}
        {activeSection === "gallery" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle accent="magenta">Галерея игр</SectionTitle>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              {["Все", "Платформер", "RPG", "Стратегия", "Аркада"].map((f, i) => (
                <button
                  key={f}
                  className="px-4 py-1.5 font-ibm text-sm border clip-corner-sm transition-all hover:bg-white/5"
                  style={{
                    borderColor: i === 0 ? "rgba(255,0,255,0.5)" : "rgba(255,255,255,0.1)",
                    color: i === 0 ? "#ff00ff" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GALLERY_GAMES.map((game) => (
                <div
                  key={game.title}
                  className="border clip-corner cursor-pointer transition-all duration-300"
                  style={{ borderColor: `${neonColors[game.color]}20`, background: `${neonColors[game.color]}04` }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${neonColors[game.color]}50`;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 8px 30px ${neonColors[game.color]}15`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${neonColors[game.color]}20`;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div className="h-40 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${neonColors[game.color]}08, rgba(0,0,0,0.3))` }}>
                    <div className="grid-bg absolute inset-0 opacity-40" />
                    <div className="relative w-20 h-20 flex items-center justify-center clip-corner" style={{ border: `1px solid ${neonColors[game.color]}40`, background: `${neonColors[game.color]}10` }}>
                      <Icon name={game.icon} size={36} style={{ color: neonColors[game.color], filter: `drop-shadow(0 0 8px ${neonColors[game.color]})` }} />
                    </div>
                    <div className="absolute top-3 right-3">
                      <NeonLabel color={game.color}>{game.genre}</NeonLabel>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-rajdhani text-lg font-bold text-white mb-1">{game.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-white/30">
                        <Icon name="Play" size={12} />
                        {game.plays} играют
                      </div>
                      <button className="font-ibm text-xs px-3 py-1 clip-corner-sm" style={{ background: `${neonColors[game.color]}20`, color: neonColors[game.color] }}>
                        Играть
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button className="px-8 py-3 font-rajdhani font-bold border clip-corner hover:bg-white/5 transition-all" style={{ borderColor: "rgba(255,0,255,0.3)", color: "#ff00ff" }}>
                Загрузить ещё
              </button>
            </div>
          </div>
        )}

        {/* ===== DOCS ===== */}
        {activeSection === "docs" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle accent="lime">Документация</SectionTitle>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {DOCS.map((doc) => (
                <div
                  key={doc.title}
                  className="border clip-corner p-5 cursor-pointer transition-all duration-200 hover:bg-white/5"
                  style={{ borderColor: `${neonColors[doc.color]}20` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${neonColors[doc.color]}40`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${neonColors[doc.color]}20`; }}
                >
                  <div className="w-10 h-10 flex items-center justify-center clip-corner-sm mb-4" style={{ background: `${neonColors[doc.color]}15` }}>
                    <Icon name={doc.icon} size={18} style={{ color: neonColors[doc.color] }} />
                  </div>
                  <h3 className="font-rajdhani text-lg font-bold text-white mb-1">{doc.title}</h3>
                  <p className="font-ibm text-sm text-white/40">{doc.desc}</p>
                  <div className="flex items-center gap-1 mt-4 font-ibm text-xs" style={{ color: neonColors[doc.color] }}>
                    Читать <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              ))}
            </div>

            <div className="border clip-corner overflow-hidden" style={{ borderColor: "rgba(0,255,136,0.2)", background: "rgba(0,0,0,0.5)" }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(0,255,136,0.1)" }}>
                <Icon name="Terminal" size={14} style={{ color: "#00ff88" }} />
                <span className="font-mono text-xs text-white/40">Быстрый старт</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                {[
                  { prefix: "$", text: "Откройте редактор NexGen", color: "lime" },
                  { prefix: "$", text: "Опишите игру на русском языке", color: "lime" },
                  { prefix: "$", text: "Нажмите «Создать игру»", color: "lime" },
                  { prefix: "✓", text: "Ваша игра готова за <60 секунд!", color: "lime" },
                ].map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span style={{ color: neonColors[line.color] }}>{line.prefix}</span>
                    <span className={i === 3 ? "" : "text-white/60"} style={i === 3 ? { color: neonColors.lime } : {}}>{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== COMMUNITY ===== */}
        {activeSection === "community" && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <SectionTitle accent="orange">Сообщество</SectionTitle>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-white/30 uppercase tracking-wider">Последние публикации</span>
                  <button className="px-4 py-1.5 font-ibm text-xs clip-corner-sm" style={{ background: "rgba(255,102,0,0.15)", color: "#ff6600", border: "1px solid rgba(255,102,0,0.3)" }}>
                    + Написать пост
                  </button>
                </div>

                {COMMUNITY_POSTS.map((post) => (
                  <div key={post.user} className="border clip-corner p-5 transition-all duration-200 hover:bg-white/3" style={{ borderColor: `${neonColors[post.color]}15` }}>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0 clip-corner-sm font-rajdhani font-bold text-sm"
                        style={{ background: `${neonColors[post.color]}20`, color: neonColors[post.color] }}
                      >
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-xs mb-2" style={{ color: neonColors[post.color] }}>{post.user}</div>
                        <p className="font-ibm text-sm text-white/60">{post.text}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <button className="flex items-center gap-1.5 font-ibm text-xs text-white/30 hover:text-white/60 transition-colors">
                            <Icon name="Heart" size={13} />
                            {post.likes}
                          </button>
                          <button className="flex items-center gap-1.5 font-ibm text-xs text-white/30 hover:text-white/60 transition-colors">
                            <Icon name="MessageCircle" size={13} />
                            Ответить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="border clip-corner p-5" style={{ borderColor: "rgba(255,102,0,0.2)", background: "rgba(255,102,0,0.04)" }}>
                  <h3 className="font-rajdhani text-lg font-bold text-white mb-4">Топ недели</h3>
                  <div className="space-y-3">
                    {["Starforge_Dev", "PixelWitch", "N3X7_Games"].map((u, i) => (
                      <div key={u} className="flex items-center gap-3">
                        <span className="font-mono text-xs w-5 text-white/20">{i + 1}.</span>
                        <div
                          className="w-8 h-8 flex items-center justify-center clip-corner-sm font-rajdhani font-bold text-xs"
                          style={{ background: [`#00ffff20`, `#ff00ff20`, `#00ff8820`][i], color: ["#00ffff", "#ff00ff", "#00ff88"][i] }}
                        >
                          {u[0]}
                        </div>
                        <span className="font-ibm text-sm text-white/50">{u}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border clip-corner p-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <h3 className="font-rajdhani text-lg font-bold text-white mb-4">Тэги</h3>
                  <div className="flex flex-wrap gap-2">
                    {["#платформер", "#rpg", "#ИИ", "#firstgame", "#пиксель", "#3d", "#аркада"].map((tag) => (
                      <span key={tag} className="font-mono text-xs px-2 py-1 cursor-pointer hover:opacity-80" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== FAQ ===== */}
        {activeSection === "faq" && (
          <div className="max-w-3xl mx-auto px-4 py-12">
            <SectionTitle accent="blue">Частые вопросы</SectionTitle>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="border clip-corner overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: openFaq === i ? "rgba(0,136,255,0.4)" : "rgba(255,255,255,0.08)",
                    background: openFaq === i ? "rgba(0,136,255,0.05)" : "transparent",
                  }}
                >
                  <button className="w-full flex items-center justify-between px-5 py-4 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-rajdhani text-lg font-semibold text-white pr-4">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      style={{ color: openFaq === i ? "#0088ff" : "rgba(255,255,255,0.3)", flexShrink: 0 }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="font-ibm text-sm text-white/55 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 border clip-corner p-6 text-center" style={{ borderColor: "rgba(0,136,255,0.2)", background: "rgba(0,136,255,0.04)" }}>
              <p className="font-ibm text-white/50 mb-4">Не нашли ответ на свой вопрос?</p>
              <button className="px-6 py-2.5 font-rajdhani font-bold clip-corner-sm text-sm" style={{ background: "linear-gradient(135deg, #0088ff, #00ffff)", color: "#000" }}>
                Задать вопрос
              </button>
            </div>
          </div>
        )}
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