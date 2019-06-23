import { Category } from './category';

export interface Company {
  id?: number;
  legal_representative?: string;
  ruc?: string;
  contributor_type?: string;
  economic_activity?: string;
  image?: string;
  business_name?: string;
  created_at?: Date;
  logo?: string;
  logo_url?: string;
  slogan?: string;
  join_at?: number;
  category_id?: number;
  category?: Category
}
