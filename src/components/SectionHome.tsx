import Icon from "@/components/ui/icon";
import { neonColors, FEATURES, NeonLabel, SectionTitle } from "@/components/shared";

interface SectionHomeProps {
  setActiveSection: (section: string) => void;
}

export default function SectionHome({ setActiveSection }: SectionHomeProps) {
  return (
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
  );
}
