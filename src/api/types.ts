export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  manager: string | null;
};

export type DepartmentStat = {
  department: string;
  count: number;
};
