export interface Notification {
  message: string;
  kind: string;
  status: string;
  from_user_id: number;
  to_user_id: number;
  created_at: number;
  id: number;
}
