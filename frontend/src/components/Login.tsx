import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const sessionExpired =
    (location.state as { from?: string })?.from === 'session_expired';

  return (
    <div className="app">
      <header className="app-header">
        <h1>Universal Launch Pad</h1>
        <p>Sign in</p>
      </header>
      <main className="app-main">
        <div className="card" style={{ maxWidth: '360px' }}>
          {sessionExpired && (
            <p className="error" style={{ marginBottom: '1rem' }}>
              Session expired. Please sign in again.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '0.25rem' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.25rem' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {error && (
              <p className="error" style={{ marginBottom: '1rem' }}>
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
