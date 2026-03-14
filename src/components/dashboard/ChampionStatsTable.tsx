import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ChampionStat, SortField, SortDirection } from '@/types/riot';
import { getChampionIcon } from '@/services/mockData';
import { ArrowUpDown, Search } from 'lucide-react';

interface Props {
  stats: ChampionStat[];
}

export const ChampionStatsTable = ({ stats }: Props) => {
  const [sortField, setSortField] = useState<SortField>('gamesPlayed');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [search, setSearch] = useState('');

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  const sorted = [...stats]
    .filter(c => c.championName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mul = sortDir === 'asc' ? 1 : -1;
      if (sortField === 'championName') return mul * a.championName.localeCompare(b.championName);
      return mul * (a[sortField] - b[sortField]);
    });

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {label}
      <ArrowUpDown size={12} className={sortField === field ? 'text-primary' : 'opacity-30'} />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="glass-surface rounded-hex overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between border-b border-border/30">
        <h2 className="font-display font-semibold text-lg">Champion Stats</h2>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="bg-surface-elevated border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-sm outline-none focus:border-primary/30 transition-colors w-40"
            placeholder="Filter..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs border-b border-border/20">
              <th className="text-left py-3 px-4 font-medium">
                <SortHeader field="championName" label="Champion" />
              </th>
              <th className="text-center py-3 px-3 font-medium">
                <SortHeader field="gamesPlayed" label="Games" />
              </th>
              <th className="text-center py-3 px-3 font-medium">
                <SortHeader field="winRate" label="Win %" />
              </th>
              <th className="text-center py-3 px-3 font-medium">
                <SortHeader field="kda" label="KDA" />
              </th>
              <th className="text-center py-3 px-3 font-medium hidden sm:table-cell">CS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {sorted.map((champ, i) => (
              <motion.tr
                key={champ.championName}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-surface-elevated/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getChampionIcon(champ.championName)}
                      alt={champ.championName}
                      className="w-8 h-8 rounded-full border border-border/30"
                    />
                    <span className="font-medium">{champ.championName}</span>
                  </div>
                </td>
                <td className="text-center font-mono text-muted-foreground">{champ.gamesPlayed}</td>
                <td className="text-center">
                  <span className={`font-mono font-medium ${champ.winRate >= 55 ? 'text-win' : champ.winRate <= 45 ? 'text-loss' : 'text-foreground'}`}>
                    {champ.winRate}%
                  </span>
                </td>
                <td className="text-center">
                  <span className="font-mono">
                    {champ.kills}/{champ.deaths}/{champ.assists}
                  </span>
                  <span className={`ml-1 text-xs font-mono ${champ.kda >= 3 ? 'text-win' : 'text-muted-foreground'}`}>
                    ({champ.kda})
                  </span>
                </td>
                <td className="text-center font-mono text-muted-foreground hidden sm:table-cell">{champ.cs}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
