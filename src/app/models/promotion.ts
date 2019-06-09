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
}
