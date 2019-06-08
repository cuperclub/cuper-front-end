import { User, UserStatus } from './user';

export interface Employee extends User {
  status?: UserStatus
}
