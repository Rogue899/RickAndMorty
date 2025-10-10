// Location type based on Rick and Morty API schema
// API Docs: https://rickandmortyapi.com/documentation/#location-schema

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; // Array of character URLs
  url: string;
  created: string;
}

export interface LocationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface LocationResponse {
  info: LocationInfo;
  results: Location[];
}

