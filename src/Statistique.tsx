import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { department } from './api/services';
import type { DepartmentStat } from './api/types';

const Statistique = () => {
  const {
    data: stats = [],
    isFetching,
  } = useQuery<DepartmentStat[]>({
    queryKey: ['directory-stats'],
    queryFn: department.getStats,
  });

  return (
    <div className="api-box">
      <h2>Statistiques</h2>
      {isFetching && <p>Loading…</p>}
      <StatsTable>
        <thead>
          <tr>
            <HeaderCell>Département</HeaderCell>
            <HeaderCellRight>Nb employés</HeaderCellRight>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.department}>
              <Cell>{s.department}</Cell>
              <CellRight>{s.count}</CellRight>
            </tr>
          ))}
          {stats.length === 0 && (
            <tr>
              <EmptyCell colSpan={2}>
                Aucun département
              </EmptyCell>
            </tr>
          )}
        </tbody>
      </StatsTable>
    </div>
  );
};

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const HeaderCell = styled.th`
  text-align: left;
  border-bottom: 1px solid #61dafb;
  padding-bottom: 0.3rem;
`;

const HeaderCellRight = styled(HeaderCell)`
  text-align: right;
`;

const Cell = styled.td`
  padding: 0.2rem 0;
`;

const CellRight = styled(Cell)`
  text-align: right;
`;

const EmptyCell = styled(Cell)`
  text-align: center;
  opacity: 0.7;
`;

export default Statistique;
