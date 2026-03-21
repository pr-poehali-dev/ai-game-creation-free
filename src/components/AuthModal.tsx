import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export default function AuthModal({ onClose, defaultTab = "login" }: AuthModalProps) {
  const { login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = tab === "login"
      ? await login(email, password)
      : await register(username, email, password);
    setLoading(false);
    if (err) { setError(err); return; }
    onClose();
  };

  const inputStyle = {
    background: "rgba(0,255,255,0.04)",
    borderColor: "rgba(0,255,255,0.2)",
    color: "rgba(255,255,255,0.85)",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-md clip-corner border"
        style={{ background: "hsl(220 20% 6%)", borderColor: "rgba(0,255,255,0.25)", boxShadow: "0 0 60px rgba(0,255,255,0.1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(0,255,255,0.1)" }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center clip-corner-sm" style={{ background: "linear-gradient(135deg,#00ffff,#0088ff)" }}>
              <Icon name="Cpu" size={13} className="text-black" />
            </div>
            <span className="font-rajdhani font-bold text-lg" style={{ color: "#00ffff" }}>NEXGEN</span>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className="flex-1 py-3 font-rajdhani font-semibold text-sm transition-all duration-200 relative"
              style={{ color: tab === t ? "#00ffff" : "rgba(255,255,255,0.35)", textShadow: tab === t ? "0 0 10px rgba(0,255,255,0.5)" : "none" }}
            >
              {t === "login" ? "Войти" : "Регистрация"}
              {tab === t && <span className="absolute bottom-0 left-4 right-4 h-px" style={{ background: "#00ffff", boxShadow: "0 0 6px #00ffff" }} />}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {tab === "register" && (
            <div>
              <label className="font-mono text-xs text-white/30 uppercase tracking-wider block mb-1.5">Имя пользователя</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="starforge_dev"
                className="w-full px-4 py-3 font-ibm text-sm border clip-corner-sm outline-none placeholder-white/20 transition-all"
                style={inputStyle}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(0,255,255,0.5)"; }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)"; }}
              />
            </div>
          )}

          <div>
            <label className="font-mono text-xs text-white/30 uppercase tracking-wider block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="player@nexgen.io"
              className="w-full px-4 py-3 font-ibm text-sm border clip-corner-sm outline-none placeholder-white/20 transition-all"
              style={inputStyle}
              onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(0,255,255,0.5)"; }}
              onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)"; }}
            />
          </div>

          <div>
            <label className="font-mono text-xs text-white/30 uppercase tracking-wider block mb-1.5">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={tab === "register" ? "Минимум 6 символов" : "••••••••"}
              className="w-full px-4 py-3 font-ibm text-sm border clip-corner-sm outline-none placeholder-white/20 transition-all"
              style={inputStyle}
              onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(0,255,255,0.5)"; }}
              onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)"; }}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 border" style={{ borderColor: "rgba(255,0,0,0.3)", background: "rgba(255,0,0,0.06)", color: "#ff6666" }}>
              <Icon name="AlertCircle" size={14} />
              <span className="font-ibm text-xs">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 font-rajdhani text-base font-bold clip-corner flex items-center justify-center gap-2 transition-all duration-300 mt-2 disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #00ffff, #0088ff)", color: "#000", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: "#00000040", borderTopColor: "transparent" }} />
                Подождите...
              </>
            ) : (
              <>
                <Icon name={tab === "login" ? "LogIn" : "UserPlus"} size={18} />
                {tab === "login" ? "Войти в аккаунт" : "Создать аккаунт"}
              </>
            )}
          </button>

          <p className="font-ibm text-xs text-center text-white/25">
            {tab === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <button type="button" onClick={() => { setTab(tab === "login" ? "register" : "login"); setError(""); }} className="transition-colors hover:opacity-80" style={{ color: "#00ffff" }}>
              {tab === "login" ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
