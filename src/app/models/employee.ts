import { User, UserStatus } from './user';
import { Company } from './company';

export enum EmployeeRol {
  PARTNER = 'partner',
  CASHIER = 'cashier'
}

export interface Employee {
  status?: UserStatus;
  feedback?: string;
  role?: EmployeeRol;
  user?: User;
  company?: Company;
}
