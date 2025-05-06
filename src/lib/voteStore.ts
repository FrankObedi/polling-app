
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment, VoteOption, VoteStats } from './types';

interface VoteState {
  hasVoted: boolean;
  userVote: VoteOption | null;
  comments: Comment[];
  gorillaVotes: number;
  menVotes: number;
  
  // Actions
  castVote: (vote: VoteOption) => void;
  addComment: (text: string, vote: VoteOption) => void;
  upvoteComment: (commentId: string) => void;
  getVoteStats: () => VoteStats;
}

// Generate a semi-random ID for comments
const generateId = () => Math.random().toString(36).substring(2, 9);

// Create initial data to make the app look active
const initialComments: Comment[] = [
  {
    id: 'initial1',
    text: "A gorilla can lift 10 times its body weight. No way 100 men could handle that kind of strength!",
    vote: 'gorilla',
    timestamp: Date.now() - 3600000,
    upvotes: 24
  },
  {
    id: 'initial2',
    text: "100 men could easily form strategies and take shifts. The gorilla would get tired eventually.",
    vote: 'men',
    timestamp: Date.now() - 7200000,
    upvotes: 18
  },
  {
    id: 'initial3',
    text: "Have you seen how strong silverbacks are? They can rip a banana tree out of the ground!",
    vote: 'gorilla',
    timestamp: Date.now() - 10800000,
    upvotes: 15
  },
  {
    id: 'initial4',
    text: "100 men with basic tools would definitely win. Numbers and intelligence matter.",
    vote: 'men',
    timestamp: Date.now() - 14400000,
    upvotes: 12
  }
];

export const useVoteStore = create<VoteState>()(
  persist(
    (set, get) => ({
      hasVoted: false,
      userVote: null,
      comments: initialComments,
      gorillaVotes: 84,
      menVotes: 102,
      
      castVote: (vote: VoteOption) => {
        if (get().hasVoted) return;
        
        set((state) => ({
          hasVoted: true,
          userVote: vote,
          gorillaVotes: vote === 'gorilla' ? state.gorillaVotes + 1 : state.gorillaVotes,
          menVotes: vote === 'men' ? state.menVotes + 1 : state.menVotes
        }));
      },
      
      addComment: (text: string, vote: VoteOption) => {
        const newComment: Comment = {
          id: generateId(),
          text,
          vote,
          timestamp: Date.now(),
          upvotes: 0
        };
        
        set((state) => ({
          comments: [newComment, ...state.comments]
        }));
      },
      
      upvoteComment: (commentId: string) => {
        set((state) => ({
          comments: state.comments.map((comment) => 
            comment.id === commentId
              ? { ...comment, upvotes: comment.upvotes + 1 }
              : comment
          )
        }));
      },
      
      getVoteStats: () => {
        const { gorillaVotes, menVotes } = get();
        const totalVotes = gorillaVotes + menVotes;
        
        return {
          gorilla: gorillaVotes,
          men: menVotes,
          totalVotes,
          gorillaPercentage: totalVotes > 0 ? Math.round((gorillaVotes / totalVotes) * 100) : 0,
          menPercentage: totalVotes > 0 ? Math.round((menVotes / totalVotes) * 100) : 0
        };
      }
    }),
    {
      name: 'gorilla-vs-men-storage'
    }
  )
);
