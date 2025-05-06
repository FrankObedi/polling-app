
import { VoteStats } from '@/lib/types';
import { Progress } from '@/components/ui/progress';

interface VoteResultsProps {
  stats: VoteStats;
}

const VoteResults = ({ stats }: VoteResultsProps) => {
  return (
    <div className="w-full p-4 bg-black bg-opacity-20 rounded-lg">
      <h3 className="text-xl font-bold text-center mb-3">Current Results</h3>
      
      <div className="flex justify-between mb-1">
        <span className="font-medium">🦍 Gorilla</span>
        <span className="font-semibold">{stats.gorillaPercentage}% ({stats.gorilla} votes)</span>
      </div>
      <Progress value={stats.gorillaPercentage} className="h-3 mb-3 bg-gray-300" indicatorClassName="bg-gorilla" />
      
      <div className="flex justify-between mb-1">
        <span className="font-medium">🧍 100 Men</span>
        <span className="font-semibold">{stats.menPercentage}% ({stats.men} votes)</span>
      </div>
      <Progress value={stats.menPercentage} className="h-3 mb-3 bg-gray-300" indicatorClassName="bg-men" />
      
      <div className="text-center text-sm mt-4">
        Total votes: {stats.totalVotes}
      </div>
    </div>
  );
};

export default VoteResults;
