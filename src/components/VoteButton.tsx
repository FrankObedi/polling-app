
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VoteOption } from '@/lib/types';

interface VoteButtonProps {
  option: VoteOption;
  onClick: () => void;
  disabled?: boolean;
}

const VoteButton = ({ option, onClick, disabled = false }: VoteButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const getButtonStyles = () => {
    if (option === 'gorilla') {
      return 'bg-gorilla hover:bg-gorilla-hover text-white text-3xl';
    }
    return 'bg-men hover:bg-men-hover text-white text-3xl';
  };

  const getEmoji = () => option === 'gorilla' ? '🦍' : '🧍';
  const getText = () => option === 'gorilla' ? 'Gorilla Wins' : '100 Men Win';
  
  return (
    <Button
      className={`vote-button p-8 w-full md:w-4/5 xl:w-3/5 h-40 ${getButtonStyles()} ${isHovering ? 'animate-pulse-scale' : ''}`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="flex flex-col items-center justify-center gap-3">
        <span className="text-5xl">{getEmoji()}</span>
        <span className="text-xl md:text-2xl font-bold">{getText()}</span>
      </span>
    </Button>
  );
};

export default VoteButton;
