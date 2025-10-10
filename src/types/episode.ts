// Episode type based on Rick and Morty API schema
// API Docs: https://rickandmortyapi.com/documentation/#episode-schema

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // Episode code (e.g., "S01E01")
  characters: string[]; // Array of character URLs
  url: string;
  created: string;
}

export interface EpisodeInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface EpisodeResponse {
  info: EpisodeInfo;
  results: Episode[];
}

