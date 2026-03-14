import { useQuery } from '@tanstack/react-query';
import { searchSummoner, getSummonerRank, getChampionStats, getMatchHistory } from '@/services/riotApi';

export const useSummoner = (name: string, tag: string) => {
  return useQuery({
    queryKey: ['summoner', name, tag],
    queryFn: () => searchSummoner(name, tag),
    enabled: !!name && !!tag,
  });
};

export const useRankedInfo = (puuid: string) => {
  return useQuery({
    queryKey: ['ranked', puuid],
    queryFn: () => getSummonerRank(puuid),
    enabled: !!puuid,
  });
};

export const useChampionStats = (puuid: string) => {
  return useQuery({
    queryKey: ['champions', puuid],
    queryFn: () => getChampionStats(puuid),
    enabled: !!puuid,
  });
};

export const useMatchHistory = (puuid: string) => {
  return useQuery({
    queryKey: ['matches', puuid],
    queryFn: () => getMatchHistory(puuid),
    enabled: !!puuid,
  });
};
