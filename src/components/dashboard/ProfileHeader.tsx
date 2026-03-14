import { motion } from 'framer-motion';
import type { Summoner, RankedInfo } from '@/types/riot';
import { getProfileIcon, tierColors } from '@/services/mockData';
import { Shield } from 'lucide-react';

interface Props {
  summoner: Summoner;
  ranked: RankedInfo[];
}

export const ProfileHeader = ({ summoner, ranked }: Props) => {
  const solo = ranked.find(r => r.queueType === 'RANKED_SOLO_5x5');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-surface rounded-hex p-6"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative">
          <img
            src={getProfileIcon(summoner.profileIconId)}
            alt="Profile Icon"
            className="w-24 h-24 rounded-full border-2 border-primary/30"
          />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-surface-elevated text-xs font-mono font-semibold px-2 py-0.5 rounded-full border border-border">
            {summoner.summonerLevel}
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div>
            <h1 className="text-2xl font-bold">
              {summoner.name}
              <span className="text-muted-foreground font-normal">#{summoner.tag}</span>
            </h1>
            <p className="text-sm text-muted-foreground">{summoner.region} Server</p>
          </div>

          {solo && (
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <Shield className={tierColors[solo.tier] || 'text-foreground'} size={20} />
              <span className={`font-display font-semibold ${tierColors[solo.tier] || ''}`}>
                {solo.tier} {solo.rank}
              </span>
              <span className="text-muted-foreground text-sm font-mono">{solo.leaguePoints} LP</span>
              <span className="text-muted-foreground text-xs">
                {solo.wins}W {solo.losses}L
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {ranked.map(r => (
            <div key={r.queueType} className="bg-surface-elevated rounded-lg p-3 text-center min-w-[100px]">
              <p className="text-xs text-muted-foreground mb-1">
                {r.queueType === 'RANKED_SOLO_5x5' ? 'Solo/Duo' : 'Flex'}
              </p>
              <p className={`font-semibold text-sm ${tierColors[r.tier] || ''}`}>
                {r.tier} {r.rank}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {((r.wins / (r.wins + r.losses)) * 100).toFixed(0)}% WR
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
