// Service to fetch and cache filter options dynamically from the API
import { api } from './api';
import { Location, Episode } from '../types';

interface FilterOptions {
  types: string[];
  dimensions: string[];
}

let locationFiltersCache: FilterOptions | null = null;
let episodeFiltersCache: string[] | null = null;

/**
 * Fetches all unique location types and dimensions from the API
 * Caches the result to avoid repeated API calls
 */
export const getLocationFilterOptions = async (): Promise<FilterOptions> => {
  if (locationFiltersCache) {
    return locationFiltersCache;
  }

  try {
    const types = new Set<string>();
    const dimensions = new Set<string>();
    
    // Fetch first 3 pages to get a good sample of types and dimensions
    const promises = [1, 2, 3].map(page => 
      api.getLocations({ page }).catch(() => null)
    );
    
    const results = await Promise.all(promises);
    
    results.forEach(data => {
      if (data && data.results) {
        data.results.forEach((location: Location) => {
          if (location.type) types.add(location.type);
          if (location.dimension) dimensions.add(location.dimension);
        });
      }
    });

    locationFiltersCache = {
      types: Array.from(types).sort(),
      dimensions: Array.from(dimensions).sort(),
    };

    return locationFiltersCache;
  } catch (error) {
    console.error('Failed to fetch location filter options:', error);
    // Return empty arrays if fetch fails
    return { types: [], dimensions: [] };
  }
};

/**
 * Fetches all unique episode codes from the API
 * Caches the result to avoid repeated API calls
 */
export const getEpisodeFilterOptions = async (): Promise<string[]> => {
  if (episodeFiltersCache) {
    return episodeFiltersCache;
  }

  try {
    const episodeCodes = new Set<string>();
    
    // Fetch first few pages to get episode codes
    const promises = [1, 2, 3].map(page => 
      api.getEpisodes({ page }).catch(() => null)
    );
    
    const results = await Promise.all(promises);
    
    results.forEach(data => {
      if (data && data.results) {
        data.results.forEach((episode: Episode) => {
          if (episode.episode) {
            // Extract season from episode code (e.g., "S01E01" -> "S01")
            const match = episode.episode.match(/S(\d+)/);
            if (match) {
              episodeCodes.add(`Season ${parseInt(match[1], 10)}`);
            }
          }
        });
      }
    });

    episodeFiltersCache = Array.from(episodeCodes).sort();
    return episodeFiltersCache;
  } catch (error) {
    console.error('Failed to fetch episode filter options:', error);
    return [];
  }
};

/**
 * Clears the filter cache (useful for testing or forcing refresh)
 */
export const clearFilterCache = () => {
  locationFiltersCache = null;
  episodeFiltersCache = null;
};

