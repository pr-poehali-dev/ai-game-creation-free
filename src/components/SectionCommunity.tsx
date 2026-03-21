import Icon from "@/components/ui/icon";
import { neonColors, COMMUNITY_POSTS, SectionTitle } from "@/components/shared";

export default function SectionCommunity() {
  return (
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
  );
}
