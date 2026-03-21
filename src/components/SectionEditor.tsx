import Icon from "@/components/ui/icon";
import { neonColors, NeonLabel, SectionTitle } from "@/components/shared";

interface SectionEditorProps {
  editorPrompt: string;
  setEditorPrompt: (v: string) => void;
  isGenerating: boolean;
  generatedCode: string;
  handleGenerate: () => void;
}

export default function SectionEditor({
  editorPrompt,
  setEditorPrompt,
  isGenerating,
  generatedCode,
  handleGenerate,
}: SectionEditorProps) {
  return (
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
                  onClick={() => setEditorPrompt(editorPrompt ? editorPrompt + ". Жанр: " + type : type + " игра")}
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
  );
}
