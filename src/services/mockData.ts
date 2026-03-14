import type { Summoner, RankedInfo, ChampionStat, Match } from '@/types/riot';

const DDRAGON = 'https://ddragon.leagueoflegends.com/cdn/14.1.1';

export const mockSummoner: Summoner = {
  id: 'abc123',
  accountId: 'def456',
  puuid: 'ghi789',
  name: 'Faker',
  tag: 'KR1',
  profileIconId: 6,
  summonerLevel: 782,
  region: 'KR',
};

export const mockRankedInfo: RankedInfo[] = [
  { queueType: 'RANKED_SOLO_5x5', tier: 'CHALLENGER', rank: 'I', leaguePoints: 1247, wins: 342, losses: 198 },
  { queueType: 'RANKED_FLEX_SR', tier: 'GRANDMASTER', rank: 'I', leaguePoints: 487, wins: 89, losses: 41 },
];

const champions = ['Ahri', 'Azir', 'Syndra', 'LeBlanc', 'Orianna', 'Ryze', 'Zed', 'Akali', 'Viktor', 'Corki'];
const roles = ['MID', 'MID', 'MID', 'MID', 'MID', 'MID', 'MID', 'MID', 'MID', 'ADC'];

export const mockChampionStats: ChampionStat[] = champions.map((name, i) => {
  const games = Math.floor(Math.random() * 80) + 10;
  const wins = Math.floor(games * (0.45 + Math.random() * 0.3));
  const kills = +(3 + Math.random() * 8).toFixed(1);
  const deaths = +(1.5 + Math.random() * 5).toFixed(1);
  const assists = +(4 + Math.random() * 8).toFixed(1);
  return {
    championId: i + 1,
    championName: name,
    gamesPlayed: games,
    wins,
    losses: games - wins,
    winRate: +((wins / games) * 100).toFixed(1),
    kills,
    deaths,
    assists,
    kda: +((kills + assists) / Math.max(deaths, 1)).toFixed(2),
    cs: Math.floor(150 + Math.random() * 100),
    role: roles[i],
  };
});

const itemNames = ['Luden\'s Tempest', 'Sorcerer\'s Shoes', 'Rabadon\'s Deathcap', 'Void Staff', 'Zhonya\'s Hourglass', 'Banshee\'s Veil'];

export const mockMatches: Match[] = Array.from({ length: 20 }, (_, i) => {
  const champ = champions[Math.floor(Math.random() * champions.length)];
  const win = Math.random() > 0.4;
  return {
    matchId: `KR_${6000000000 + i}`,
    championName: champ,
    championId: champions.indexOf(champ) + 1,
    win,
    kills: Math.floor(Math.random() * 15),
    deaths: Math.floor(Math.random() * 8),
    assists: Math.floor(Math.random() * 18),
    cs: Math.floor(150 + Math.random() * 150),
    duration: Math.floor(20 + Math.random() * 25),
    gameMode: 'Ranked Solo',
    items: itemNames.slice(0, 4 + Math.floor(Math.random() * 3)).map((name, j) => ({
      id: j + 3001,
      name,
      icon: `${DDRAGON}/img/item/${3001 + j * 100}.png`,
    })),
    role: 'MID',
    timestamp: Date.now() - i * 3600000,
  };
});

export const getChampionIcon = (name: string) =>
  `${DDRAGON}/img/champion/${name}.png`;

export const getProfileIcon = (id: number) =>
  `${DDRAGON}/img/profileicon/${id}.png`;

export const getItemIcon = (id: number) =>
  `${DDRAGON}/img/item/${id}.png`;

export const tierColors: Record<string, string> = {
  IRON: 'text-muted-foreground',
  BRONZE: 'text-orange-400',
  SILVER: 'text-gray-300',
  GOLD: 'text-accent',
  PLATINUM: 'text-teal-400',
  EMERALD: 'text-emerald-400',
  DIAMOND: 'text-blue-400',
  MASTER: 'text-purple-400',
  GRANDMASTER: 'text-red-400',
  CHALLENGER: 'text-accent',
};
