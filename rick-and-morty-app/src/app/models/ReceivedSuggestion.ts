
export interface ReceivedSuggestion {
  id: number;
  title: string;
  creator: string;
  isCreatorActive: boolean;
  plot: string;
  date: string;
  approvals: number;
  approval_rate: number;
  approve_users_id: number[]
}