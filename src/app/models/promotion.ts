import { Office } from './office';

export interface Promotion {
  id?: number;
  title?: string;
  description?: string;
  terms?: string;
  total_rewards?: number;
  unlimited?: boolean;
  points_required?: number;
  start_at?: Date;
  end_at?: Date;
  image?: string;
  image_url?: string;
  office?: Office
}
