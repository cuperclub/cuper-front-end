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
  id?: number;
  name?: string;
  nickname?: string;
  image?: string;
  image_url?: string;
  email?: string;
  national_id?: string;
  points?: number;
  join_at?: Date;
  companies?: Array<any>;
  pending_notifications?: number;
  provider?: string;
}

export enum UserStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  DISABLED = 'disabled',
  DECLINED = 'declined',
}
