import styled from 'styled-components';

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.75rem 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

export const CardTitle = styled.h2`
  margin: 0 0 1.25rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
`;

export const HeaderCell = styled.th`
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

export const Cell = styled.td`
  padding: 0.7rem 0.75rem;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9;
`;

export const DataRow = styled.tr`
  transition: background 0.1s;

  &:hover {
    background: #f8fafc;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const EmptyCell = styled(Cell)`
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
`;
