import type {
  Character,
  CharacterResponse,
  CharacterFilterParams,
  Location,
  LocationResponse,
  LocationFilterParams,
  Episode,
  EpisodeResponse,
  EpisodeFilterParams,
} from '../types';
import cacheService, { CacheTTL } from './cache';
import { API_CONFIG } from '../constants/app-config';

const BASE_URL = API_CONFIG.BASE_URL;

const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const fetchWithCache = async <T>(url: string, ttl?: number): Promise<T> => {
  const cached = cacheService.get<T>(url);
  if (cached !== null) {
    return cached;
  }

  const response = await fetch(url);
  const data = await handleResponse<T>(response);

  cacheService.set(url, data, ttl);

  return data;
};

const getCharacters = async (filters: CharacterFilterParams = {}): Promise<CharacterResponse> => {
  const queryString = buildQueryString(filters);
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}${queryString}`;
  return fetchWithCache<CharacterResponse>(url, CacheTTL.MEDIUM);
};

const getCharacter = async (id: string | number): Promise<Character> => {
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/${id}`;
  return fetchWithCache<Character>(url, CacheTTL.LONG);
};

const getMultipleCharacters = async (ids: number[]): Promise<Character[]> => {
  if (ids.length === 0) return [];
  const idsString = ids.join(',');
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.CHARACTERS}/${idsString}`;
  const data = await fetchWithCache<Character | Character[]>(url, CacheTTL.LONG);
  return Array.isArray(data) ? data : [data];
};

const getLocations = async (filters: LocationFilterParams = {}): Promise<LocationResponse> => {
  const queryString = buildQueryString(filters);
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}${queryString}`;
  return fetchWithCache<LocationResponse>(url, CacheTTL.MEDIUM);
};

const getLocation = async (id: string | number): Promise<Location> => {
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}/${id}`;
  return fetchWithCache<Location>(url, CacheTTL.LONG);
};

const getMultipleLocations = async (ids: number[]): Promise<Location[]> => {
  if (ids.length === 0) return [];
  const idsString = ids.join(',');
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.LOCATIONS}/${idsString}`;
  const data = await fetchWithCache<Location | Location[]>(url, CacheTTL.LONG);
  return Array.isArray(data) ? data : [data];
};

const getLocationIdFromUrl = (url: string): number | null => {
  const match = url.match(/\/location\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

const getEpisodes = async (filters: EpisodeFilterParams = {}): Promise<EpisodeResponse> => {
  const queryString = buildQueryString(filters);
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.EPISODES}${queryString}`;
  return fetchWithCache<EpisodeResponse>(url, CacheTTL.MEDIUM);
};

const getEpisode = async (id: string | number): Promise<Episode> => {
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.EPISODES}/${id}`;
  return fetchWithCache<Episode>(url, CacheTTL.LONG);
};

const getMultipleEpisodes = async (ids: number[]): Promise<Episode[]> => {
  if (ids.length === 0) return [];
  const idsString = ids.join(',');
  const url = `${BASE_URL}${API_CONFIG.ENDPOINTS.EPISODES}/${idsString}`;
  const data = await fetchWithCache<Episode | Episode[]>(url, CacheTTL.LONG);
  return Array.isArray(data) ? data : [data];
};

const getEpisodeIdFromUrl = (url: string): number | null => {
  const match = url.match(/\/episode\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

const getEpisodeIdsFromUrls = (urls: string[]): number[] => {
  return urls
    .map(url => getEpisodeIdFromUrl(url))
    .filter((id): id is number => id !== null);
};

const getCharacterIdFromUrl = (url: string): number | null => {
  const match = url.match(/\/character\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

const getCharacterIdsFromUrls = (urls: string[]): number[] => {
  return urls
    .map(url => getCharacterIdFromUrl(url))
    .filter((id): id is number => id !== null);
};

const getApiInfo = async (): Promise<{
  characters: string;
  locations: string;
  episodes: string;
}> => {
  return fetchWithCache(BASE_URL, CacheTTL.EXTRA_LONG);
};

export const api = {
  getCharacters,
  getCharacter,
  getMultipleCharacters,
  getLocations,
  getLocation,
  getMultipleLocations,
  getLocationIdFromUrl,
  getEpisodes,
  getEpisode,
  getMultipleEpisodes,
  getEpisodeIdFromUrl,
  getEpisodeIdsFromUrls,
  getCharacterIdFromUrl,
  getCharacterIdsFromUrls,
  getApiInfo,
};

export { default as cacheService, cacheHelpers, CacheTTL } from './cache';

export type {
  Character,
  CharacterResponse,
  CharacterFilterParams,
  Location,
  LocationResponse,
  LocationFilterParams,
  Episode,
  EpisodeResponse,
  EpisodeFilterParams,
};
