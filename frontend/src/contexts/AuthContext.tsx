import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, apiSetGetToken, setUnauthorizedHandler } from '../config/api';

export interface AuthUser {
  username: string;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function parseJwtPayload(token: string): AuthUser | null {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    const json = atob(base64);
    const payload = JSON.parse(json) as { username?: string };
    return payload.username ? { username: payload.username } : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  const navigate = useNavigate();

  const user = useMemo(() => (token ? parseJwtPayload(token) : null), [token]);
  const isAuthenticated = !!token;

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message || 'Invalid username or password',
        );
      }
      const data = (await response.json()) as { access_token: string };
      setToken(data.access_token);
      localStorage.setItem('token', data.access_token);
    },
    [],
  );

  useEffect(() => {
    apiSetGetToken(() => token);
  }, [token]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      navigate('/login', { replace: true, state: { from: 'session_expired' } });
    });
    return () => setUnauthorizedHandler(() => {});
  }, [logout, navigate]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [token, user, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
