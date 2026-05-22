import { useEffect, useState } from 'react';

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  manager: string | null;
};

function Directory() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const url = search
          ? `/api/directory?search=${encodeURIComponent(search)}`
          : '/api/directory';
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unexpected error');
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div className="api-box">
      <h2>Annuaire</h2>

      <input
        type="search"
        placeholder="Rechercher un employé…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '0.4rem 0.6rem',
          marginBottom: '0.8rem',
          fontSize: '0.9rem',
          borderRadius: 4,
          border: '1px solid #61dafb',
          background: 'transparent',
          color: 'inherit',
        }}
      />

      {loading && <p>Loading…</p>}
      {error && <p className="error">Error: {error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Prénom</th>
            <th style={th}>Nom</th>
            <th style={th}>Département</th>
            <th style={th}>Manager</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.id}>
              <td style={td}>{e.id}</td>
              <td style={td}>{e.firstName}</td>
              <td style={td}>{e.lastName}</td>
              <td style={td}>{e.department}</td>
              <td style={td}>{e.manager ?? '—'}</td>
            </tr>
          ))}
          {!loading && employees.length === 0 && (
            <tr>
              <td colSpan={5} style={{ ...td, textAlign: 'center', opacity: 0.7 }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: 'left',
  borderBottom: '1px solid #61dafb',
  paddingBottom: '0.3rem',
};

const td: React.CSSProperties = { padding: '0.2rem 0' };

export default Directory;
