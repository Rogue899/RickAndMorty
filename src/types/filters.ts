// Filter parameter types for all API endpoints
// API Docs: https://rickandmortyapi.com/documentation

// Character filter parameters
export interface CharacterFilterParams {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown' | '';
  species?: string;
  type?: string;
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | '';
}

// Location filter parameters
export interface LocationFilterParams {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

// Episode filter parameters
export interface EpisodeFilterParams {
  page?: number;
  name?: string;
  episode?: string; // Episode code (e.g., "S01E01")
}

// Helper type for building query strings
export type FilterParams = CharacterFilterParams | LocationFilterParams | EpisodeFilterParams;

// Status options for character filter
export const CHARACTER_STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
] as const;

// Gender options for character filter
export const CHARACTER_GENDER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
] as const;

