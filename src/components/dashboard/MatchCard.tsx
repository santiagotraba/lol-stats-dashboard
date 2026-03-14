import { motion } from 'framer-motion';
import type { Match } from '@/types/riot';
import { getChampionIcon } from '@/services/mockData';
import { cn } from '@/lib/utils';

interface Props {
  match: Match;
  index: number;
}

export const MatchCard = ({ match, index }: Props) => {
  const kda = ((match.kills + match.assists) / Math.max(match.deaths, 1)).toFixed(2);
  const timeAgo = Math.floor((Date.now() - match.timestamp) / 3600000);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-surface-hover rounded-hex overflow-hidden"
    >
      <div className="flex items-center gap-0">
        {/* Win/Loss bar */}
        <div className={cn(
          "w-1 self-stretch rounded-l-hex",
          match.win ? "bg-win" : "bg-loss"
        )} />

        <div className="flex items-center gap-4 p-4 flex-1 min-w-0">
          {/* Champion */}
          <div className="relative flex-shrink-0">
            <img
              src={getChampionIcon(match.championName)}
              alt={match.championName}
              className="w-12 h-12 rounded-full border-2 border-border/30"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-semibold text-sm",
                match.win ? "text-win" : "text-loss"
              )}>
                {match.win ? 'Victory' : 'Defeat'}
              </span>
              <span className="text-xs text-muted-foreground">{match.gameMode}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{match.championName}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-muted-foreground">{match.duration}m</span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">{timeAgo}h ago</span>
            </div>
          </div>

          {/* KDA */}
          <div className="text-center flex-shrink-0">
            <p className="font-mono font-medium text-sm">
              {match.kills}/<span className="text-loss">{match.deaths}</span>/{match.assists}
            </p>
            <p className={cn(
              "text-xs font-mono",
              parseFloat(kda) >= 3 ? "text-win" : "text-muted-foreground"
            )}>
              {kda} KDA
            </p>
          </div>

          {/* Items */}
          <div className="hidden md:grid grid-cols-3 gap-1 flex-shrink-0">
            {match.items.slice(0, 6).map((item, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-sm bg-surface-elevated border border-border/20 flex items-center justify-center overflow-hidden"
              >
                <img src={item.icon} alt={item.name} className="w-full h-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
              </div>
            ))}
          </div>

          {/* CS */}
          <div className="text-center flex-shrink-0 hidden lg:block">
            <p className="font-mono text-sm text-muted-foreground">{match.cs} CS</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
