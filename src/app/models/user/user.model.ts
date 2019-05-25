export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  nickname?: string;
  image?: string;
  email?: string;
  national_id?: string;
}

export enum UserStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  DISABLED = 'disabled',
}
