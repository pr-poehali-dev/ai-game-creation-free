import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const AUTH_URL = "https://functions.poehali.dev/b8b801c5-6476-4d0a-8f41-82fe1a55547a";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (username: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("ng_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${AUTH_URL}?action=me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else { localStorage.removeItem("ng_token"); setToken(null); }
      })
      .catch(() => { localStorage.removeItem("ng_token"); setToken(null); })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (email: string, password: string): Promise<string | null> => {
    const r = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", email, password }),
    });
    const data = await r.json();
    if (data.error) return data.error;
    localStorage.setItem("ng_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return null;
  };

  const register = async (username: string, email: string, password: string): Promise<string | null> => {
    const r = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "register", username, email, password }),
    });
    const data = await r.json();
    if (data.error) return data.error;
    localStorage.setItem("ng_token", data.token);
    setToken(data.token);
    setUser(data.user);
    return null;
  };

  const logout = async () => {
    if (token) {
      await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "logout" }),
      }).catch(() => {});
    }
    localStorage.removeItem("ng_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
