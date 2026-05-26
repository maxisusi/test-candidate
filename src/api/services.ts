import axios from 'axios';
import type { DepartmentStat, Employee } from './types';

export const directory = {
  getAll: async (search?: string): Promise<Employee[]> => {
    const url = search
      ? `/api/directory?search=${encodeURIComponent(search)}`
      : '/api/directory';
    const { data } = await axios.get<Employee[]>(url);
    return data;
  },
};

export const department = {
  getStats: async (): Promise<DepartmentStat[]> => {
    const { data } = await axios.get<DepartmentStat[]>('/api/directory/stats');
    return data;
  },
};
