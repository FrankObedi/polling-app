import { useState } from 'react';
import { useVoteStore } from '@/lib/voteStore';
import VoteResults from '@/components/VoteResults';
import CommentSection from '@/components/CommentSection';
import { Button } from '@/components/ui/button';
import { VoteOption } from '@/lib/types';

const Results = () => {
    const { hasVoted, getVoteStats } = useVoteStore();
    const [activeTab, setActiveTab] = useState<VoteOption | 'all'>('all');
    const stats = getVoteStats();
  

    return (
        <div className="min-h-screen">
            {/* Results Section */}
        <div className="bg-gray-900 text-white p-6 md:p-10">
            <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Live Results</h2>
            
            <div className="md:w-3/4 lg:w-2/3 mx-auto mb-10">
                <VoteResults stats={stats} />
            </div>
            
            {/* Only show all comments tab if user has voted */}
            {hasVoted && (
                <div className="mt-10">
                <div className="flex justify-center mb-6">
                    <div className="bg-gray-800 inline-flex p-1 rounded-lg">
                    <Button
                        variant={activeTab === 'all' ? 'default' : 'ghost'}
                        className="text-sm"
                        onClick={() => setActiveTab('all')}
                    >
                        All Comments
                    </Button>
                    
                    <Button
                        variant={activeTab === 'gorilla' ? 'default' : 'ghost'}
                        className="text-sm"
                        onClick={() => setActiveTab('gorilla')}
                    >
                        🦍 Team Gorilla
                    </Button>
                    
                    <Button
                        variant={activeTab === 'men' ? 'default' : 'ghost'}
                        className="text-sm"
                        onClick={() => setActiveTab('men')}
                    >
                        🧍 Team Men
                    </Button>
                    </div>
                </div>
                
                <div className="md:w-3/4 lg:w-2/3 mx-auto">
                    <CommentSection voteOption={activeTab} />
                </div>
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
}

export default Results;