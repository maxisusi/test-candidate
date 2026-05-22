import { useEffect, useState } from 'react';

type DepartmentStat = {
  department: string;
  count: number;
};

function Statistique() {
  const [stats, setStats] = useState<DepartmentStat[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch('/api/directory/stats', { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: DepartmentStat[] = await response.json();
        setStats(data);
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return;
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <div className="api-box">
      <h2>Statistiques</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={th}>Département</th>
            <th style={{ ...th, textAlign: 'right' }}>Nb employés</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.department}>
              <td style={td}>{s.department}</td>
              <td style={{ ...td, textAlign: 'right' }}>{s.count}</td>
            </tr>
          ))}
          {stats.length === 0 && (
            <tr>
              <td colSpan={2} style={{ ...td, textAlign: 'center', opacity: 0.7 }}>
                Aucun département
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

export default Statistique;
