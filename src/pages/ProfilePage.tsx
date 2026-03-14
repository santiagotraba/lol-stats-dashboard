import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { ProfileHeader } from '@/components/dashboard/ProfileHeader';
import { ChampionStatsTable } from '@/components/dashboard/ChampionStatsTable';
import { MatchCard } from '@/components/dashboard/MatchCard';
import { StatsCharts } from '@/components/dashboard/StatsCharts';
import { SkeletonProfile, SkeletonMatchCard, SkeletonChampionRow } from '@/components/ui/skeleton-cards';
import { useSummoner, useRankedInfo, useChampionStats, useMatchHistory } from '@/hooks/useSummoner';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { name = '', tag = '' } = useParams<{ name: string; tag: string }>();

  const { data: summoner, isLoading: loadingSummoner } = useSummoner(name, tag);
  const { data: ranked, isLoading: loadingRanked } = useRankedInfo(summoner?.puuid || '');
  const { data: champStats, isLoading: loadingChamps } = useChampionStats(summoner?.puuid || '');
  const { data: matches, isLoading: loadingMatches } = useMatchHistory(summoner?.puuid || '');

  const isLoading = loadingSummoner || loadingRanked;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        {isLoading ? (
          <SkeletonProfile />
        ) : summoner && ranked ? (
          <ProfileHeader summoner={summoner} ranked={ranked} />
        ) : null}

        {/* Charts */}
        {loadingChamps ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-surface rounded-hex p-4 h-[280px]" />
            ))}
          </div>
        ) : champStats ? (
          <StatsCharts stats={champStats} />
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Champion Stats */}
          <div className="lg:col-span-2">
            {loadingChamps ? (
              <div className="glass-surface rounded-hex overflow-hidden">
                <div className="p-4 border-b border-border/30">
                  <h2 className="font-display font-semibold text-lg">Champion Stats</h2>
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonChampionRow key={i} />
                ))}
              </div>
            ) : champStats ? (
              <ChampionStatsTable stats={champStats} />
            ) : null}
          </div>

          {/* Match History */}
          <div className="lg:col-span-3 space-y-3">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-semibold text-lg px-1"
            >
              Match History
            </motion.h2>
            {loadingMatches ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonMatchCard key={i} />)
            ) : matches ? (
              matches.map((match, i) => <MatchCard key={match.matchId} match={match} index={i} />)
            ) : (
              <p className="text-muted-foreground text-sm px-1">No matches found. Time to hit the practice tool.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
