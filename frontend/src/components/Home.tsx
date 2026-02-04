import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Universal Launch Pad</h1>
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
          <div>
            <Link to="/quiz" style={{ 
              display: 'inline-block',
              padding: '0.875rem 2rem',
              background: '#007AC1',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              transition: 'background 0.2s ease, transform 0.1s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#005a8f';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#007AC1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
