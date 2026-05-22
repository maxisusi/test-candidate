import { useEffect, useState } from 'react';
import './App.css';
import Directory from './Directory';

type Product = {
  id: number;
  name: string;
  price: number;
};

type ApiResponse = {
  message: string;
  version: string;
  timestamp: string;
  products: Product[];
};

function App() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFromSymfony = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/hello');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: ApiResponse = await response.json();
      setApiData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
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
            <>
              <ul>
                <li><strong>Message:</strong> {apiData.message}</li>
                <li><strong>Symfony version:</strong> {apiData.version}</li>
                <li><strong>Timestamp:</strong> {apiData.timestamp}</li>
              </ul>
              <h3>Products from DB</h3>
              <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem'}}>
                <thead>
                  <tr>
                    <th style={{textAlign: 'left', borderBottom: '1px solid #61dafb', paddingBottom: '0.3rem'}}>ID</th>
                    <th style={{textAlign: 'left', borderBottom: '1px solid #61dafb', paddingBottom: '0.3rem'}}>Name</th>
                    <th style={{textAlign: 'right', borderBottom: '1px solid #61dafb', paddingBottom: '0.3rem'}}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.products.map((p) => (
                    <tr key={p.id}>
                      <td style={{padding: '0.2rem 0'}}>{p.id}</td>
                      <td>{p.name}</td>
                      <td style={{textAlign: 'right'}}>${p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <button onClick={fetchFromSymfony} disabled={loading}>
            Refresh
          </button>
        </div>

        <Directory />
      </header>
    </div>
  );
}

export default App;
