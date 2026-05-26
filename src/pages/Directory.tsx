import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { directory } from '../api/services';
import type { Employee } from '../api/types';
import SkeletonBar from '../components/Skeleton';
import { Card, CardTitle, HeaderCell, Cell, DataRow, EmptyCell } from '../components/Table';
import { useDebounceValue } from '../hooks/useDebounceValue';
import { translation } from '../translations/translation';

const DEBOUNCE_DELAY_MS = 250;
const SKELETON_ROWS = 6;

// The currently authenticated user
const CURRENT_USER: Employee = {
  id: 4,
  firstName: 'David',
  lastName: 'Schmidt',
  department: 'Sales',
  manager: null,
};

export const Directory = () => {
  const t = translation.directory;
  const [search, setSearch] = useState('');
  const [pinMeToTop, setPinMeToTop] = useState(false);
  const debouncedSearch = useDebounceValue(search, DEBOUNCE_DELAY_MS);

  const {
    data: employees = [],
    error,
    isLoading,
  } = useQuery<Employee[], Error>({
    queryKey: ['directory', debouncedSearch],
    queryFn: () => directory.getAll(debouncedSearch || undefined),
    placeholderData: (previousData) => previousData,
  });

  const displayedEmployees = pinMeToTop
    ? [CURRENT_USER, ...employees]
    : employees;

  return (
    <Card>
      <CardTitle>{t.title}</CardTitle>

      <SearchInput
        type="search"
        placeholder={t.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CheckboxLabel>
        <input
          type="checkbox"
          checked={pinMeToTop}
          onChange={(e) => setPinMeToTop(e.target.checked)}
        />
        {t.pinMeToTop} ({CURRENT_USER.firstName} {CURRENT_USER.lastName})
      </CheckboxLabel>

      {error && <ErrorText>{translation.common.errorPrefix} {error.message}</ErrorText>}

      <DirectoryTable>
        <thead>
          <tr>
            <HeaderCell>{t.columns.id}</HeaderCell>
            <HeaderCell>{t.columns.firstName}</HeaderCell>
            <HeaderCell>{t.columns.lastName}</HeaderCell>
            <HeaderCell>{t.columns.department}</HeaderCell>
            <HeaderCell>{t.columns.manager}</HeaderCell>
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
            : displayedEmployees.length > 0
              ? displayedEmployees.map((e) => (
                  <DataRow key={e.id}>
                    <Cell>{e.id}</Cell>
                    <Cell>{e.firstName}</Cell>
                    <Cell>{e.lastName}</Cell>
                    <Cell>{e.department}</Cell>
                    <Cell>{e.manager ?? translation.common.emptyValue}</Cell>
                  </DataRow>
                ))
              : (
                  <tr>
                    <EmptyCell colSpan={5}>{t.empty}</EmptyCell>
                  </tr>
                )
          }
        </tbody>
      </DirectoryTable>
    </Card>
  );
};

const DirectoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 1.25rem;
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: #2563eb;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;


