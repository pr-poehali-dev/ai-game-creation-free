import Icon from "@/components/ui/icon";
import { neonColors, DOCS, SectionTitle } from "@/components/shared";

export default function SectionDocs() {
  return (
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
  );
}
