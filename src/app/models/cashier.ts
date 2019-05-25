import { User, UserStatus } from './user/user.model';

export interface Cashier extends User {
  status?: UserStatus
}
