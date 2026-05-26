import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { directory } from './api/services';
import type { Employee } from './api/types';

const Directory = () => {
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
    isFetching,
  } = useQuery<Employee[], Error>({
    queryKey: ['directory', debouncedSearch],
    queryFn: () => directory.getAll(debouncedSearch || undefined),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div className="api-box">
      <h2>Annuaire</h2>

      <SearchInput
        type="search"
        placeholder="Rechercher un employé…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isFetching && <p>Loading…</p>}
      {error && <p className="error">Error: {error.message}</p>}

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
          {employees.map((e) => (
            <tr key={e.id}>
              <Cell>{e.id}</Cell>
              <Cell>{e.firstName}</Cell>
              <Cell>{e.lastName}</Cell>
              <Cell>{e.department}</Cell>
              <Cell>{e.manager ?? '—'}</Cell>
            </tr>
          ))}
          {!isFetching && employees.length === 0 && (
            <tr>
              <EmptyCell colSpan={5}>
                No employees found
              </EmptyCell>
            </tr>
          )}
        </tbody>
      </DirectoryTable>
    </div>
  );
};

const SearchInput = styled.input`
  width: 100%;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid #61dafb;
  background: transparent;
  color: inherit;
`;

const DirectoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const HeaderCell = styled.th`
  text-align: left;
  border-bottom: 1px solid #61dafb;
  padding-bottom: 0.3rem;
`;

const Cell = styled.td`
  padding: 0.2rem 0;
`;

const EmptyCell = styled(Cell)`
  text-align: center;
  opacity: 0.7;
`;

export default Directory;
