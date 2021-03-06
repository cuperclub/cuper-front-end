import { Company } from './company';

export interface Office {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  active?: boolean;
  company_id?: number;
  lat?: number;
  long?: number;
  company?: Company;
}
