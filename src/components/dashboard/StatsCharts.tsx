import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import type { ChampionStat } from '@/types/riot';

interface Props {
  stats: ChampionStat[];
}

const CHART_COLORS = [
  'hsl(210, 60%, 55%)',
  'hsl(45, 60%, 60%)',
  'hsl(175, 45%, 45%)',
  'hsl(280, 40%, 55%)',
  'hsl(15, 55%, 50%)',
  'hsl(150, 45%, 45%)',
  'hsl(330, 45%, 50%)',
  'hsl(200, 50%, 50%)',
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-elevated border border-border/50 rounded-lg px-3 py-2 text-sm shadow-lg">
      <p className="font-medium">{label || payload[0]?.name}</p>
      <p className="text-primary font-mono">{payload[0]?.value}{typeof payload[0]?.value === 'number' && payload[0]?.value < 100 ? '' : ''}</p>
    </div>
  );
};

export const StatsCharts = ({ stats }: Props) => {
  const top5 = [...stats].sort((a, b) => b.gamesPlayed - a.gamesPlayed).slice(0, 5);

  const winRateData = top5.map(c => ({
    name: c.championName,
    winRate: c.winRate,
  }));

  const gamesData = top5.map(c => ({
    name: c.championName,
    games: c.gamesPlayed,
  }));

  const roleMap = stats.reduce<Record<string, number>>((acc, c) => {
    acc[c.role] = (acc[c.role] || 0) + c.gamesPlayed;
    return acc;
  }, {});
  const roleData = Object.entries(roleMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Winrate by Champion */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-surface rounded-hex p-4"
      >
        <h3 className="font-display font-semibold text-sm mb-4">Win Rate by Champion</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={winRateData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <XAxis dataKey="name" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(220,10%,50%)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="winRate" radius={[4, 4, 0, 0]}>
              {winRateData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Most Played */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-surface rounded-hex p-4"
      >
        <h3 className="font-display font-semibold text-sm mb-4">Most Played Champions</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={gamesData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 10 }}>
            <XAxis type="number" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fill: 'hsl(220,10%,50%)', fontSize: 11 }} axisLine={false} tickLine={false} width={65} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="games" radius={[0, 4, 4, 0]}>
              {gamesData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Games per Role */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-surface rounded-hex p-4"
      >
        <h3 className="font-display font-semibold text-sm mb-4">Games per Role</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} strokeWidth={2} stroke="hsl(230,20%,14%)">
              {roleData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {roleData.map((r, i) => (
            <div key={r.name} className="flex items-center gap-1.5 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span className="text-muted-foreground">{r.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
