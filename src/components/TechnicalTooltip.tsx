import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface TechnicalTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
  className?: string;
}

const TechnicalTooltip = ({ term, definition, children, className }: TechnicalTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center gap-1 cursor-help border-b border-dotted border-primary/50 ${className}`}>
            {children}
            <Info className="h-3 w-3 text-primary/70" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs p-3 bg-background/95 backdrop-blur-sm border shadow-lg">
          <div className="space-y-2">
            <p className="font-semibold text-primary">{term}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechnicalTooltip;