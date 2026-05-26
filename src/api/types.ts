export type Product = {
  id: number;
  name: string;
  price: number;
};

export type HelloResponse = {
  message: string;
  version: string;
  timestamp: string;
  products: Product[];
};

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
