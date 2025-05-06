import { useState } from 'react';
import { useVoteStore } from '@/lib/voteStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { VoteOption } from '@/lib/types';
import CommentCard from './CommentCard';

interface CommentSectionProps {
  voteOption: VoteOption | 'all';
}

const CommentSection = ({ voteOption }: CommentSectionProps) => {
  const [comment, setComment] = useState('');
  const { comments, addComment } = useVoteStore();
  
  const filteredComments = voteOption === 'all' 
    ? comments 
    : comments.filter(c => c.vote === voteOption);
  
  const handleSubmit = () => {
    if (comment.trim() === '' || voteOption === 'all') return;
    
    addComment(comment.trim(), voteOption);
    setComment('');
  };
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">Share Your Reasoning</h3>
      
      {voteOption !== 'all' && (
        <div className="mb-6">
          <Textarea 
            placeholder={`Why do you think the ${voteOption === 'gorilla' ? 'gorilla' : '100 men'} would win?`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-white bg-opacity-10 border-none focus:ring-white text-white resize-none"
            rows={4}
          />
          
          <div className="flex justify-end mt-2">
            <Button 
              onClick={handleSubmit} 
              disabled={comment.trim() === ''}
              className={`px-4 py-2 ${voteOption === 'gorilla' ? 'bg-gorilla hover:bg-gorilla-hover' : 'bg-men hover:bg-men-hover'}`}
            >
              Post Comment
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">What Others Think</h3>
        
        {filteredComments.length === 0 ? (
          <p className="text-center py-8 opacity-70">Be the first to comment!</p>
        ) : (
          filteredComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
