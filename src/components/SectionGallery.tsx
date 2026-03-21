import Icon from "@/components/ui/icon";
import { neonColors, GALLERY_GAMES, NeonLabel, SectionTitle } from "@/components/shared";
import { useAuth } from "@/context/AuthContext";

interface SectionGalleryProps {
  onAuthOpen: (tab?: "login" | "register") => void;
}

export default function SectionGallery({ onAuthOpen }: SectionGalleryProps) {
  const { user } = useAuth();
  return (
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
                <button
                  onClick={() => !user && onAuthOpen("login")}
                  className="font-ibm text-xs px-3 py-1 clip-corner-sm flex items-center gap-1 transition-all"
                  style={{ background: `${neonColors[game.color]}20`, color: neonColors[game.color] }}
                >
                  {!user && <Icon name="Lock" size={11} />}
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
  );
}