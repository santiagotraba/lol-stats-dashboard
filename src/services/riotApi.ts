import { mockSummoner, mockRankedInfo, mockChampionStats, mockMatches } from './mockData';
import type { Summoner, RankedInfo, ChampionStat, Match } from '@/types/riot';

// Mock API service - replace with real Riot API calls via backend proxy
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export const searchSummoner = async (name: string, tag: string): Promise<Summoner> => {
  await delay(800);
  return { ...mockSummoner, name, tag };
};

export const getSummonerRank = async (_puuid: string): Promise<RankedInfo[]> => {
  await delay(600);
  return mockRankedInfo;
};

export const getChampionStats = async (_puuid: string): Promise<ChampionStat[]> => {
  await delay(700);
  return mockChampionStats;
};

export const getMatchHistory = async (_puuid: string): Promise<Match[]> => {
  await delay(900);
  return mockMatches;
};
