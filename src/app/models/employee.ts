import { User, UserStatus } from './user';
import { Company } from './company';

export interface Employee {
  status?: UserStatus;
  feedback?: string;
  role?: string;
  user?: User;
  company?: Company;
}
