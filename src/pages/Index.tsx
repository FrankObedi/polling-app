import { useState } from 'react';
import { useVoteStore } from '@/lib/voteStore';
import VoteButton from '@/components/VoteButton';
import VoteResults from '@/components/VoteResults';
import CommentSection from '@/components/CommentSection';
import { Button } from '@/components/ui/button';
import { VoteOption } from '@/lib/types';
import { Share } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  const { hasVoted, userVote, castVote, getVoteStats } = useVoteStore();
  const [activeTab, setActiveTab] = useState<VoteOption | 'all'>('all');
  const stats = getVoteStats();
  const { toast } = useToast();

  const handleVote = (vote: VoteOption) => {
    castVote(vote);
    setActiveTab(vote);
    
    toast({
      title: "Vote recorded!",
      description: `You voted that ${vote === 'gorilla' ? 'the gorilla' : '100 men'} would win.`,
      duration: 3000
    });
  };
  
  const handleShare = () => {
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: 'Gorilla vs 100 Men: Who Would Win?',
        text: 'Cast your vote in the great debate!',
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The URL has been copied to your clipboard.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🦍 vs 🧍×100</h1>
        <p className="text-lg md:text-xl opacity-80">Who would win in a fight?</p>
        
        <div className="mt-4 flex justify-center">
          <Button 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-gray-900"
            onClick={handleShare}
          >
            <Share className="w-4 h-4 mr-2" /> Share This Debate
          </Button>
        </div>
      </header>
      
      <div className="vote-container">
        {/* Gorilla Side */}
        <div className="w-full md:w-1/2 gorilla-side p-6 md:p-10 flex flex-col items-center overflow-y-auto">
          <div className="flex flex-col items-center justify-center flex-grow">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Team Gorilla</h2>
            
            {!hasVoted && (
              <VoteButton option="gorilla" onClick={() => handleVote('gorilla')} />
            )}
            
            {hasVoted && userVote === 'gorilla' && (
              <div className="text-center mb-6">
                <h3 className="text-xl">You voted for the Gorilla!</h3>
                <p className="opacity-80">Scroll down to comment</p>
              </div>
            )}
          </div>
          
          {hasVoted && userVote === 'gorilla' && (
            <div className="w-full mt-8">
              <CommentSection voteOption="gorilla" />
            </div>
          )}
          {(hasVoted && userVote != 'gorilla') && (
            <div className="w-full mt-8">
              <div className="flex justify-between mb-1">
              <span className="font-medium">🦍 Gorilla</span>
              <span className="font-semibold">{stats.gorillaPercentage}% ({stats.gorilla} votes)</span>
            </div>
            <Progress value={stats.gorillaPercentage} className="h-3 mb-3 bg-gray-300" indicatorClassName="bg-gorilla" />
            </div>
          )}
        </div>
        
        {/* Men Side */}
        <div className="w-full md:w-1/2 men-side p-6 md:p-10 flex flex-col items-center overflow-y-auto">
          <div className="flex flex-col items-center justify-center flex-grow">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Team 100 Men</h2>
            
            {!hasVoted && (
              <VoteButton option="men" onClick={() => handleVote('men')} />
            )}
            
            {hasVoted && userVote === 'men' && (
              <div className="text-center mb-6">
                <h3 className="text-xl">You voted for 100 Men!</h3>
                <p className="opacity-80">Scroll down to comment</p>
              </div>
            )}
          </div>
          
          {hasVoted && userVote === 'men' && (
            <div className="w-full mt-8">
              <CommentSection voteOption="men" />
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 p-4 text-center border-t border-gray-800">
        <p>© 2025 Gorilla vs 100 Men Debate</p>
      </footer>
    </div>
  );
};

export default Index;
