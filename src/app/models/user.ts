export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name?: string;
  nickname?: string;
  image?: string;
  image_url?: string;
  email?: string;
  national_id?: string;
  points?: number;
  join_at?: Date;
}

export enum UserStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  DISABLED = 'disabled',
}
