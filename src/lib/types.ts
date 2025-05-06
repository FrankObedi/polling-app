
export type VoteOption = 'gorilla' | 'men';

export interface Comment {
  id: string;
  text: string;
  vote: VoteOption;
  timestamp: number;
  upvotes: number;
}

export interface VoteStats {
  gorilla: number;
  men: number;
  totalVotes: number;
  gorillaPercentage: number;
  menPercentage: number;
}
