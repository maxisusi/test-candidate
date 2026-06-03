import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { department } from '../api/services';
import type { DepartmentStat } from '../api/types';
import SkeletonBar from '../components/Skeleton';
import { Card, CardTitle, HeaderCell, Cell, DataRow, EmptyCell } from '../components/Table';
import { translation } from '../translations/translation';

const SKELETON_ROWS = 4;

export const Statistics = () => {
  const t = translation.statistics;
  const {
    data: stats = [],
    isLoading,
  } = useQuery<DepartmentStat[]>({
    queryKey: ['directory-stats'],
    queryFn: department.getStats,
  });

  return (
    <Card>
      <CardTitle>{t.title}</CardTitle>
      <StatsTable>
        <thead>
          <tr>
            <HeaderCell>{t.columns.department}</HeaderCell>
            <HeaderCellRight>{t.columns.employeeCount}</HeaderCellRight>
          </tr>
        </thead>
        <tbody>
          {isLoading
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
                    <EmptyCell colSpan={2}>{t.empty}</EmptyCell>
                  </tr>
                )
          }
        </tbody>
      </StatsTable>
    </Card>
  );
};

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

const HeaderCellRight = styled(HeaderCell)`
  text-align: right;
`;

const CellRight = styled(Cell)`
  text-align: right;
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
