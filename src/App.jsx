import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFromSymfony = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/hello');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFromSymfony();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React + Symfony
        </p>

        <div className="api-box">
          <h2>Symfony API Response</h2>
          {loading && <p>Loading…</p>}
          {error && <p className="error">Error: {error}</p>}
          {apiData && (
            <ul>
              <li><strong>Message:</strong> {apiData.message}</li>
              <li><strong>Symfony version:</strong> {apiData.version}</li>
              <li><strong>Timestamp:</strong> {apiData.timestamp}</li>
            </ul>
          )}
          <button onClick={fetchFromSymfony} disabled={loading}>
            Refresh
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
