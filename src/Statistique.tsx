import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { department } from './api/services';
import type { DepartmentStat } from './api/types';
import SkeletonBar from './components/Skeleton';

const SKELETON_ROWS = 4;

export const Statistique = () => {
  const {
    data: stats = [],
    isFetching,
  } = useQuery<DepartmentStat[]>({
    queryKey: ['directory-stats'],
    queryFn: department.getStats,
  });

  return (
    <Card>
      <CardTitle>Statistiques par département</CardTitle>
      <StatsTable>
        <thead>
          <tr>
            <HeaderCell>Département</HeaderCell>
            <HeaderCellRight>Nb employés</HeaderCellRight>
          </tr>
        </thead>
        <tbody>
          {isFetching
            ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <tr key={i}>
                  <Cell><SkeletonBar width="60%" /></Cell>
                  <CellRight><SkeletonBar width="3rem" /></CellRight>
                </tr>
              ))
            : stats.length > 0
              ? stats.map((s) => (
                  <DataRow key={s.department}>
                    <Cell>{s.department}</Cell>
                    <CellRight>
                      <Badge>{s.count}</Badge>
                    </CellRight>
                  </DataRow>
                ))
              : (
                  <tr>
                    <EmptyCell colSpan={2}>Aucun département</EmptyCell>
                  </tr>
                )
          }
        </tbody>
      </StatsTable>
    </Card>
  );
};

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.75rem 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const CardTitle = styled.h2`
  margin: 0 0 1.25rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
`;

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

const HeaderCell = styled.th`
  text-align: left;
  padding: 0.6rem 0.75rem;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  color: #64748b;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const HeaderCellRight = styled(HeaderCell)`
  text-align: right;
`;

const Cell = styled.td`
  padding: 0.7rem 0.75rem;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9;
`;

const CellRight = styled(Cell)`
  text-align: right;
`;

const DataRow = styled.tr`
  transition: background 0.1s;

  &:hover {
    background: #f8fafc;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const Badge = styled.span`
  display: inline-block;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
`;

const EmptyCell = styled(Cell)`
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
`;


