
import { useState } from 'react';
import { Comment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { useVoteStore } from '@/lib/voteStore';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const { upvoteComment } = useVoteStore();
  
  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };
  
  const handleUpvote = () => {
    if (!hasUpvoted) {
      upvoteComment(comment.id);
      setHasUpvoted(true);
    }
  };
  
  return (
    <div className={`comment-card ${comment.vote === 'gorilla' ? 'gorilla-comment' : 'men-comment'}`}>
      <div className="flex justify-between mb-2">
        <span className="font-semibold">
          {comment.vote === 'gorilla' ? '🦍 Team Gorilla' : '🧍 Team 100 Men'}
        </span>
        <span className="text-xs opacity-70">{getTimeAgo(comment.timestamp)}</span>
      </div>
      
      <p className="text-sm md:text-base mb-3">{comment.text}</p>
      
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleUpvote}
          disabled={hasUpvoted}
          className="flex items-center gap-1 text-xs opacity-80 hover:opacity-100"
        >
          <ThumbsUp size={12} />
          <span>{comment.upvotes}</span>
        </Button>
      </div>
    </div>
  );
};

export default CommentCard;
