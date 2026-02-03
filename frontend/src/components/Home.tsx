import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch, API_BASE_URL } from '../config/api';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchMessage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch(`${API_BASE_URL}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }
      const data = await response.text();
      setMessage(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Universal Launch Pad</h1>
        <p>Frontend connected to NestJS API</p>
        {user && (
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Signed in as {user.username}
            {' · '}
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit',
              }}
            >
              Sign out
            </button>
          </p>
        )}
      </header>

      <main className="app-main">
        <div className="card">
          <h2>API Response</h2>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
          {message && !loading && !error && (
            <p className="message">{message}</p>
          )}
          <button onClick={fetchMessage} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
            <Link to="/quiz" style={{ 
              display: 'inline-block',
              padding: '0.75rem 2rem',
              background: '#764ba2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'background 0.3s ease'
            }}>
              Start Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
