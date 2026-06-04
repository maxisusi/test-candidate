import type { Employee } from './types';

/**
 * Raw shape returned by the backend `/api/directory` endpoint.
 * Fields may be missing or have different nullability than the UI type.
 */
export type RawEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  department: string | null | undefined;
  manager: string | null | undefined;
};

/**
 * Adapts a single raw employee from the API response into the Employee UI type.
 */

export const adaptEmployee = (raw: RawEmployee): Employee => ({
  id: raw.id,
  firstName: raw.firstName.trim(),
  lastName: raw.lastName.trim(),
  department: raw.department?.trim() ?? null,
  manager: raw.manager?.trim() ?? null,
});

/**
 * Adapts an array of raw employees from the API response.
 */
export const adaptEmployees = (raw: RawEmployee[]): Employee[] =>
  raw.map(adaptEmployee);
