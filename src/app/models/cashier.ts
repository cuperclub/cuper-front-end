import { User, UserStatus } from './user';

export interface Cashier extends User {
  status?: UserStatus
}
