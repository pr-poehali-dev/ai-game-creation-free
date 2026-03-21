import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_ITEMS, SectionTitle } from "@/components/shared";

export default function SectionFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
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
  );
}
