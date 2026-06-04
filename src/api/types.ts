export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  department: string | null;
  manager: string | null;
};

export type DepartmentStat = {
  department: string | null;
  count: number;
};
