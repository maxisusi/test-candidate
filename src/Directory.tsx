import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { directory } from './api/services';
import type { Employee } from './api/types';
import SkeletonBar from './components/Skeleton';

const SKELETON_ROWS = 6;

export const Directory = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const {
    data: employees = [],
    error,
    isLoading,
  } = useQuery<Employee[], Error>({
    queryKey: ['directory', debouncedSearch],
    queryFn: () => directory.getAll(debouncedSearch || undefined),
    placeholderData: (previousData) => previousData,
  });

  return (
    <Card>
      <CardTitle>Annuaire</CardTitle>

      <SearchInput
        type="search"
        placeholder="Rechercher un employé…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {error && <ErrorText>Erreur : {error.message}</ErrorText>}

      <DirectoryTable>
        <thead>
          <tr>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Prénom</HeaderCell>
            <HeaderCell>Nom</HeaderCell>
            <HeaderCell>Département</HeaderCell>
            <HeaderCell>Manager</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Cell key={j}><SkeletonBar width={j === 0 ? '2rem' : '80%'} /></Cell>
                  ))}
                </tr>
              ))
            : employees.length > 0
              ? employees.map((e) => (
                  <DataRow key={e.id}>
                    <Cell>{e.id}</Cell>
                    <Cell>{e.firstName}</Cell>
                    <Cell>{e.lastName}</Cell>
                    <Cell>{e.department}</Cell>
                    <Cell>{e.manager ?? '—'}</Cell>
                  </DataRow>
                ))
              : (
                  <tr>
                    <EmptyCell colSpan={5}>Aucun employé trouvé</EmptyCell>
                  </tr>
                )
          }
        </tbody>
      </DirectoryTable>
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

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  color: #1e293b;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const DirectoryTable = styled.table`
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

const Cell = styled.td`
  padding: 0.7rem 0.75rem;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9;
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

const EmptyCell = styled(Cell)`
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
`;


