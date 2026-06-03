import axios from 'axios';
import type { DepartmentStat } from './types';
import type { RawEmployee } from './adapters';

export const directory = {
  getAll: async (search?: string): Promise<RawEmployee[]> => {
    const url = search
      ? `/api/directory?search=${encodeURIComponent(search)}`
      : '/api/directory';
    const { data } = await axios.get<RawEmployee[]>(url);
    return data;
  },
};

export const department = {
  getStats: async (): Promise<DepartmentStat[]> => {
    const { data } = await axios.get<DepartmentStat[]>('/api/directory/stats');
    return data;
  },
};
