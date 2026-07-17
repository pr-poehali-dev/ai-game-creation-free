import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const AUTH_URL = "https://functions.poehali.dev/fea8e184-054b-45bb-a4d4-dfc61895ab6c";
const OAUTH_URL = "https://functions.poehali.dev/1aaa4d1a-1e5b-42c5-aa63-493f25677874";

export type OAuthProvider = "google" | "yandex" | "facebook" | "vk";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  oauthError: string | null;
  clearOauthError: () => void;
  login: (email: string, password: string) => Promise<string | null>;
  register: (username: string, email: string, password: string) => Promise<string | null>;
  loginWithProvider: (provider: OAuthProvider) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function readUrlParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function cleanUrlParams(names: string[]) {
  const url = new URL(window.location.href);
  names.forEach((n) => url.searchParams.delete(n));
  window.history.replaceState({}, "", url.toString());
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    const fromUrl = readUrlParam("oauth_token");
    if (fromUrl) return fromUrl;
    return localStorage.getItem("ng_token");
  });
  const [loading, setLoading] = useState(true);
  const [oauthError, setOauthError] = useState<string | null>(() => readUrlParam("oauth_error"));

  useEffect(() => {
    if (readUrlParam("oauth_token") || readUrlParam("oauth_error")) {
      cleanUrlParams(["oauth_token", "oauth_error"]);
    }
  }, []);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetch(`${AUTH_URL}?action=me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("ng_token", token);
        } else {
          localStorage.removeItem("ng_token");
          setToken(null);
        }
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

  const loginWithProvider = (provider: OAuthProvider) => {
    const redirectUri = window.location.origin + window.location.pathname;
    const url = `${OAUTH_URL}?provider=${provider}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = url;
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

  const clearOauthError = () => setOauthError(null);

  return (
    <AuthContext.Provider value={{ user, token, loading, oauthError, clearOauthError, login, register, loginWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
