export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  tag: string;
  profileIconId: number;
  summonerLevel: number;
  region: string;
}

export interface RankedInfo {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

export interface ChampionStat {
  championId: number;
  championName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  cs: number;
  role: string;
}

export interface MatchItem {
  id: number;
  name: string;
  icon: string;
}

export interface Match {
  matchId: string;
  championName: string;
  championId: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  duration: number;
  gameMode: string;
  items: MatchItem[];
  role: string;
  timestamp: number;
}

export type SortField = 'gamesPlayed' | 'winRate' | 'kda' | 'championName';
export type SortDirection = 'asc' | 'desc';
